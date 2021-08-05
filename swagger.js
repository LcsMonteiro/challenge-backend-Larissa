const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/partner.routes.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Challenge Backend - Partners",
    description:
      "Esta aplicação é uma API que fornece informações de localizaçao de parceiros do Zé Delivery.",
    termsOfService:
      "https://github.com/ZXVentures/ze-code-challenges/blob/master/backend_pt.md",
    contact: {
      email: "lcsmonteiiro@gmail.com",
    },
  },
  host: "localhost:5050",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Partner",
      description: "Endpoints",
    },
  ],
  paths: {
    "/create": {
      post: {
        tags: ["Partner"],
        description: "Endpoint para criar parceiro.",
        parameters: [
          {
            name: "obj",
            in: "body",
            schema: {
              type: "object",
              properties: {
                tradingName: {
                  example: "Bar Nem Tanto",
                },
                ownerName: {
                  example: "Pelé Maradona",
                },
                document: {
                  example: "27494912000113",
                },
                coverageArea: {
                  example: {
                    type: "MultiPolygon",
                    coordinates: [
                      [
                        [
                          [-49.40021, -20.744762],
                          [-49.451366, -20.799013],
                          [-49.422527, -20.85934],
                          [-49.38373, -20.876663],
                          [-49.326054, -20.872814],
                          [-49.302708, -20.861906],
                          [-49.338413, -20.785534],
                          [-49.308544, -20.769484],
                          [-49.328457, -20.742516],
                          [-49.40021, -20.744762],
                        ],
                      ],
                    ],
                  },
                },
                address: {
                  example: {
                    type: "Point",
                    coordinates: [-43.961945, -19.927483],
                  },
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: "Parceiro criado",
            schema: {
              $ref: "#/definitions",
            },
          },
          500: {
            description: "Erro interno do servidor.",
            schema: {
              $ref: "#/definitions",
            },
          },
        },
      },
    },
  },
  "/list": {
    get: {
      tags: ["Partner"],
      description: "Endpoint para listar todos os parceiros.",
      parameters: [{ $ref: "#/parameters/list" }],
      responses: {
        200: {
          description: "Parceiros listados.",
          schema: {
            $ref: "#/definitions",
          },
        },
      },
    },
  },
  "/find/{id}": {
    get: {
      tags: ["Partner"],
      description: "Endpoint para pesquisar parceiro pelo id.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "ID do usuário.",
        },
      ],
      responses: {
        200: {
          description: "Parceiro encontrado.",
          schema: {
            $ref: "#/definitions",
          },
        },
        404: {
          description: "Parceiro não encontrado.",
          schema: {
            $ref: "#/definitions",
          },
        },
        500: {
          description: "Erro interno do servidor.",
          schema: {
            $ref: "#/definitions",
          },
        },
      },
    },
  },
  "/nearest": {
    get: {
      tags: ["Partner"],
      description:
        "Endpoint para buscar parceiro mais próximo pela longitude e latitude.",
      parameters: [
        {
          name: "lng",
          description: "longitude",
          type: "string",
          in: "query",
        },
        {
          name: "lat",
          description: "latitude",
          type: "string",
          in: "query",
        },
      ],
      responses: {
        200: {
          description: "Parceiro mais próximo econtrado.",
          schema: {
            $ref: "#/definitions",
          },
        },
        400: {
          description: "Nao há parceiros próximos.",
          schema: {
            $ref: "#/definitions",
          },
        },
        404: {
          description: "Parceiro nao encontrado.",
          schema: {
            $ref: "#/definitions",
          },
        },
      },
    },
  },
  "/delete/{id}": {
    delete: {
      tags: ["Partner"],
      description: "Endpoint para deletar parceiro pelo id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "ID do usuário.",
        },
      ],
      responses: {
        200: {
          description: "Parceiro deletado.",
          schema: {
            $ref: "#/definitions",
          },
        },
        400: {
          description: "Parceiro nao encontrado.",
          schema: {
            $ref: "#/definitions",
          },
        },
        500: {
          description: "Erro interno do servidor.",
          schema: {
            $ref: "#/definitions",
          },
        },
      },
    },
  },
  definitions: {
    tradingName: "Adega Emporio",
    ownerName: "Eduardo Pipoca",
    document: "82.666.231/0001-01",
    coverageArea: {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-67.83039, -9.95782],
            [-67.83176, -9.98487],
            [-67.78627, -9.98825],
            [-67.78885, -9.95105],
            [-67.83039, -9.95782],
          ],
        ],
      ],
    },
    address: {
      type: "Point",
      coordinates: [-67.81702, -9.970223],
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server");
});
