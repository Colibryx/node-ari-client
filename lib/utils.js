/**
 *  Utility functions for ari-client.
 *
 *  @module utils
 *
 *  @copyright 2022, Colibryx
 *  @author Carlo Masaia <public@karurochari.com>
 *  @copyright 2014, Digium, Inc.
 *  @author Samuel Fortier-Galarneau <sgalarneau@digium.com>
 *
 *  @license Apache License, Version 2.0
 */

"use strict";

/**
 *  Modifies options to swagger as body params as appropriate using the given
 *  defined operation parameters.
 *
 *  @memberof module:utils
 *  @method parseBodyParams
 *  @param {Object[]} params - defined operation parameters
 *  @param {Object} swaggerOptions - options that will be sent to a swagger operation
 *  @returns {Object} modified options
 */
export function parseBodyParams(params, swaggerOptions) {
  const options = structuredClone(swaggerOptions);
  const bodyParams = params.filter(function (param) {
    return param.paramType === "body";
  });

  bodyParams.forEach(function (bodyParam) {
    const jsonBody = options[bodyParam.name];
    if (jsonBody) {
      // variables behaves differently in that it expects a variables key to
      // wrap the key/value pairs
      if (bodyParam.name === "variables" && !options.variables.variables) {
        jsonBody = { variables: jsonBody };
      } else if (bodyParam.name === "fields" && !options.fields.fields) {
        jsonBody = { fields: jsonBody };
      }
      options.body = JSON.stringify(jsonBody);
      delete options[bodyParam.name];
    }
  });

  return options;
}
