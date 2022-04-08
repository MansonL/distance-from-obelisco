import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { RequestError } from "../middleware/errorHandler";
import { addressSchema } from "../services/validator";
import { IAddressesResponse } from "../types";
import * as dotenv from "dotenv";
import node_geocoder, { Entry } from "node-geocoder";
import haversine from "haversine-distance";
import { createClient, createClientAsync } from "soap";

dotenv.config();

const nodeGeocoder = node_geocoder({
  apiKey: process.env.OPENCAGE_API_KEY,
  provider: "opencage",
});

const obeliscoCoordinates = {
  latitude: -34.603699804961195,
  longitude: -58.38157896860418,
};

export const normalizeAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = req.query;
    const { error } = addressSchema.validate(address);
    if (error) next(new RequestError(error.message, 400));
    else {
      const department = address["departamento"]
        ? address["departamento"]
        : false;
      const stringAddress = `${address["calle"]} nro ${address["altura"]}`;
      const data = (
        await axios.get<IAddressesResponse>(
          `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${stringAddress}${
            department ? `&departamento=${department}` : ""
          }&provincia=${address["provincia"]}`
        )
      ).data;
      const addressesList = data.direcciones.map(
        (address) => address.nomenclatura
      );
      addressesList.length > 0
        ? res.status(200).json(addressesList)
        : res
            .status(200)
            .send(
              `No se encontraron resultados exactos para la búsqueda, la solicitud a la API está OK.`
            );
    }
  } catch (error) {
    // Here should be the logger logging the error
    console.log(JSON.stringify(error, null, "\t"));
  }
};

export const distanceFromObelisco = async (req: Request, res: Response) => {
  try {
    const { address } = req.query;
    if (typeof address === "string" && address !== "") {
      const addressesResponse = await nodeGeocoder.geocode(address);
      const selectedAddress: Entry = addressesResponse[0];
      const selectedCoordinates = {
        latitude: selectedAddress.latitude as number,
        longitude: selectedAddress.longitude as number,
      };
      const distance =
        haversine(selectedCoordinates, obeliscoCoordinates) / 1000;
      const responseText =
        distance > 5
          ? "Estás a más de 5km del Obelisco."
          : "Estás a menos de 5km del Obelisco.";
      if (addressesResponse.length > 1) {
        res.status(200).send({
          message:
            responseText +
            " Puede que la ubicación seleccionada sea incorrecta, se ha utilizado un geocodificador y puede que no sea exacto. Para ello se debería seleccionar la opción que más se adecúe entre las encontradas a continuación.",
          addresses: addressesResponse,
        });
      } else {
        res.status(200).send({
          message:
            responseText +
            " Es la única ubicación encontrada según las especificaciones ingresadas.",
          address: addressesResponse,
        });
      }
    } else {
      res.status(400).send("No conozco esa dirección.");
    }
  } catch (error) {
    // Here should be the logger logging the error
    console.log(JSON.stringify(error, null, "\t"));
  }
};

export const currencyName = async (req: Request, res: Response) => {
  try {
    const { country } = req.query;
    if (country && typeof country === "string") {
      const client = await createClientAsync(
        "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL"
      );
      client.CountryInfoService.CountryInfoServiceSoap.FullCountryInfoAllCountries(
        (error, result, body) => {
          if (result) {
            const countryMatched =
              result.FullCountryInfoAllCountriesResult.tCountryInfo.filter(
                (countryInfo) => countryInfo.sName === country
              );
            if (countryMatched.length > 0) {
              const countryCurrencyISOCode = countryMatched[0].sCurrencyISOCode;
              client.CountryInfoService.CountryInfoServiceSoap.CurrencyName(
                { sCurrencyISOCode: countryCurrencyISOCode },
                (error, result) => {
                  res
                    .status(200)
                    .send(
                      `La moneda del país ingresado es: ${result.CurrencyNameResult}`
                    );
                }
              );
            } else {
              res
                .status(400)
                .send("No se encontraron países con el nombre ingresado.");
            }
          } else {
            res.status(500).send({
              message: "Hubo un error solicitando el servicio web SOAP.",
              error: error,
            });
          }
        }
      );
    } else {
      res.status(400).send("Inserte un nombre de país válido");
    }
  } catch (error) {
    // Here should be the logger logging the error
    console.log(JSON.stringify(error, null, "\t"));
  }
};
