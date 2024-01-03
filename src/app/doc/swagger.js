'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';


const api_spec = `
{
    "openapi": "3.0.0",
    "info": {
        "title": "no-code-website-builder",
        "version": "1.0"
    },
    "servers": [
        {
            "url": "http://localhost:3000/api",
            "description": "local server"
        },
        {
            "url": "https://sandra.cinatrin.pro/api",
            "description": "poduct server"
        }
    ],
    "paths": {
        "/auth/exists/{name}": {
            "get": {
                "tags": [
                    "auth"
                ],
                "summary": "check username exist",
                "parameters": [
                    {
                        "name": "name",
                        "in": "path",
                        "required": true,
                        "description": "username to check",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "user_exist": {
                                            "type": "boolean"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            }
        },
        "/auth/register": {
            "post": {
                "tags": [
                    "auth"
                ],
                "summary": "register",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "name"
                                ]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "jwt": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "username had used"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            }
        },
        "/auth/login": {
            "post": {
                "tags": [
                    "auth"
                ],
                "summary": "login",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "name"
                                ]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "jwt": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "username or password wrong"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            }
        },
        "/user/": {
            "get": {
                "tags": [
                    "user"
                ],
                "summary": "get user name",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "user not found"
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            },
            "put": {
                "tags": [
                    "user"
                ],
                "summary": "change password",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "new_password": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "new_password"
                                ]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "success"
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            }
        },
        "/gallery/": {
            "get": {
                "tags": [
                    "gallery"
                ],
                "summary": "get all pages information",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "pages_data": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "page_id": {
                                                        "type": "string"
                                                    },
                                                    "name": {
                                                        "type": "string"
                                                    },
                                                    "description": {
                                                        "type": "string"
                                                    },
                                                    "css_type": {
                                                        "type": "integer"
                                                    },
                                                    "background_image": {
                                                        "type": "integer"
                                                    },
                                                    "background_color1": {
                                                        "type": "string"
                                                    },
                                                    "background_color2": {
                                                        "type": "string"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            }
        },
        "/page/": {
            "post": {
                "tags": [
                    "page"
                ],
                "summary": "create page",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "description": {
                                        "type": "string"
                                    },
                                    "css_type": {
                                        "type": "integer"
                                    },
                                    "background_image": {
                                        "type": "integer"
                                    },
                                    "background_color1": {
                                        "type": "string"
                                    },
                                    "background_color2": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "page_id"
                                ]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "page_id": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            }
        },
        "/page/{page_id}": {
            "get": {
                "tags": [
                    "page"
                ],
                "summary": "get the page's data",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    },
                    {
                        "in": "path",
                        "name": "page_id",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "pages_data": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "string"
                                                    },
                                                    "node_properties": {}
                                                }
                                            }
                                        },
                                        "information": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string"
                                                },
                                                "description": {
                                                    "type": "string"
                                                },
                                                "css_type": {
                                                    "type": "integer"
                                                },
                                                "background_image": {
                                                    "type": "integer"
                                                },
                                                "background_color1": {
                                                    "type": "string"
                                                },
                                                "background_color2": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "404": {
                        "description": "page not found"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            },
            "put": {
                "tags": [
                    "page"
                ],
                "summary": "update page information",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    },
                    {
                        "in": "path",
                        "name": "page_id",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "update": {
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "type": "string"
                                            },
                                            "description": {
                                                "type": "string"
                                            },
                                            "css_type": {
                                                "type": "integer"
                                            },
                                            "background_image": {
                                                "type": "integer"
                                            },
                                            "background_color1": {
                                                "type": "string"
                                            },
                                            "background_color2": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "success"
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "404": {
                        "description": "page not found"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            },
            "delete": {
                "tags": [
                    "page"
                ],
                "summary": "delete page",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    },
                    {
                        "in": "path",
                        "name": "page_id",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success"
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "404": {
                        "description": "page not found"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            }
        },
        "/node/{page_id}": {
            "post": {
                "tags": [
                    "node"
                ],
                "summary": "create node",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    },
                    {
                        "in": "path",
                        "name": "page_id",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "pre_node_id": {
                                        "type": "string"
                                    },
                                    "content": {
                                        "type": "object",
                                        "properties": {
                                            "node_properties": {}
                                        }
                                    }
                                },
                                "required": [
                                    "pre_node_id",
                                    "content"
                                ]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "node_id": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "404": {
                        "description": "place not found"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            }
        },
        "/node/{node_id}": {
            "get": {
                "tags": [
                    "node"
                ],
                "summary": "get node content",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    },
                    {
                        "in": "path",
                        "name": "node_id",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "content": {
                                            "type": "object",
                                            "properties": {
                                                "node_properties": {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "404": {
                        "description": "node not found"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            },
            "put": {
                "tags": [
                    "node"
                ],
                "summary": "update node content",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    },
                    {
                        "in": "path",
                        "name": "node_id",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "content": {
                                        "type": "object",
                                        "properties": {
                                            "node_properties": {}
                                        }
                                    }
                                },
                                "required": [
                                    "content"
                                ]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "success"
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "404": {
                        "description": "node not found"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            },
            "delete": {
                "tags": [
                    "node"
                ],
                "summary": "delete node",
                "parameters": [
                    {
                        "in": "header",
                        "name": "token",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    },
                    {
                        "in": "path",
                        "name": "node_id",
                        "schema": {
                            "type": "string"
                        },
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success"
                    },
                    "403": {
                        "description": "no token or token wrong"
                    },
                    "404": {
                        "description": "node not found"
                    },
                    "500": {
                        "description": "server error"
                    }
                }
            }
        }
    }
}
`

function ReactSwagger() {
  return <SwaggerUI spec={api_spec} />;
}

export default ReactSwagger;