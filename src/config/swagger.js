
import dotenv from 'dotenv';

dotenv.config();
const swaggerOptions = {
  openapi: "3.0.3",
  info: {
    title: "Task Management API",
    version: "1.0.0",
    description:
      "OpenAPI 3.0 specification generated from the current Express + Mongoose source code.",
  },
  servers: [
    {
      url: "/",
      description: "Local development server",
    },
  ],
  tags: [
   
    {
      name: "Tasks",
      description: "CRUD and status management for tasks.",
    },
  ],
  paths: {
   
    "/api/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "List all tasks",
        description: "Fetches every task stored in MongoDB.",
        operationId: "getAllTasks",
        responses: {
          "200": {
            description: "List of tasks.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Task",
                  },
                },
                examples: {
                  success: {
                    value: [
                      {
                        _id: "66c14e7f5fd2b8a8fb2d3c11",
                        title: "Hoc Express.js",
                        description: "Hoan thanh REST API",
                        status: "todo",
                        priority: "high",
                        dueDate: "2026-08-20T00:00:00.000Z",
                        createdAt: "2026-08-16T04:00:00.000Z",
                        updatedAt: "2026-08-16T04:00:00.000Z",
                        __v: 0,
                      },
                    ],
                  },
                },
              },
            },
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      post: {
        tags: ["Tasks"],
        summary: "Create a task",
        description:
          "Creates a new task. Only `title` is required by the model; other fields are optional and use schema defaults when omitted.",
        operationId: "createTask",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TaskCreateRequest",
              },
              examples: {
                default: {
                  summary: "Minimal create payload",
                  value: {
                    title: "Hoc Express.js",
                    description: "Hoan thanh REST API",
                    priority: "high",
                    dueDate: "2026-08-20",
                  },
                },
                withStatus: {
                  summary: "Explicit status payload",
                  value: {
                    title: "Lam task doing",
                    status: "doing",
                    priority: "medium",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Task created successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
                examples: {
                  success: {
                    value: {
                      _id: "66c14e7f5fd2b8a8fb2d3c11",
                      title: "Hoc Express.js",
                      description: "Hoan thanh REST API",
                      status: "todo",
                      priority: "high",
                      dueDate: "2026-08-20T00:00:00.000Z",
                      createdAt: "2026-08-16T04:00:00.000Z",
                      updatedAt: "2026-08-16T04:00:00.000Z",
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/api/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        summary: "Get a task by ID",
        description: "Returns a single task by MongoDB ObjectId.",
        operationId: "getTaskById",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the task.",
            schema: {
              type: "string",
              example: "66c14e7f5fd2b8a8fb2d3c11",
            },
          },
        ],
        responses: {
          "200": {
            description: "Task found.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
                examples: {
                  success: {
                    value: {
                      _id: "66c14e7f5fd2b8a8fb2d3c11",
                      title: "Hoc Express.js",
                      description: "Hoan thanh REST API",
                      status: "todo",
                      priority: "high",
                      dueDate: "2026-08-20T00:00:00.000Z",
                      createdAt: "2026-08-16T04:00:00.000Z",
                      updatedAt: "2026-08-16T04:00:00.000Z",
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          "404": {
            $ref: "#/components/responses/TaskNotFound",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      put: {
        tags: ["Tasks"],
        summary: "Update a task by ID",
        description:
          "Updates a task with the provided fields. Validation is enforced by Mongoose on the updated document.",
        operationId: "updateTask",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the task.",
            schema: {
              type: "string",
              example: "66c14e7f5fd2b8a8fb2d3c11",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TaskUpdateRequest",
              },
              examples: {
                update: {
                  value: {
                    title: "Hoc Express.js nang cao",
                    description: "Hoan thanh REST API va MongoDB",
                    priority: "high",
                    dueDate: "2026-08-25",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Task updated successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
                examples: {
                  success: {
                    value: {
                      _id: "66c14e7f5fd2b8a8fb2d3c11",
                      title: "Hoc Express.js nang cao",
                      description: "Hoan thanh REST API va MongoDB",
                      status: "todo",
                      priority: "high",
                      dueDate: "2026-08-25T00:00:00.000Z",
                      createdAt: "2026-08-16T04:00:00.000Z",
                      updatedAt: "2026-08-16T04:10:00.000Z",
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          "404": {
            $ref: "#/components/responses/TaskNotFound",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Delete a task by ID",
        description: "Deletes a task and returns no response body.",
        operationId: "deleteTask",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the task.",
            schema: {
              type: "string",
              example: "66c14e7f5fd2b8a8fb2d3c11",
            },
          },
        ],
        responses: {
          "204": {
            description: "Task deleted successfully.",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/api/tasks/{id}/status": {
      patch: {
        tags: ["Tasks"],
        summary: "Advance task status",
        description:
          "Updates the task status following the allowed order: `todo -> doing -> done`. Any other transition returns a 400 error.",
        operationId: "updateTaskStatus",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the task.",
            schema: {
              type: "string",
              example: "66c14e7f5fd2b8a8fb2d3c11",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/StatusUpdateRequest",
              },
              examples: {
                doing: {
                  value: {
                    status: "doing",
                  },
                },
                done: {
                  value: {
                    status: "done",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Task status updated successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
                examples: {
                  success: {
                    value: {
                      _id: "66c14e7f5fd2b8a8fb2d3c11",
                      title: "Hoc Express.js",
                      description: "Hoan thanh REST API",
                      status: "doing",
                      priority: "high",
                      dueDate: "2026-08-20T00:00:00.000Z",
                      createdAt: "2026-08-16T04:00:00.000Z",
                      updatedAt: "2026-08-16T04:15:00.000Z",
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "404": {
            $ref: "#/components/responses/TaskNotFound",
          },
        },
      },
    },
  },
  components: {
    responses: {
      BadRequest: {
        description: "Invalid input or invalid status transition.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
            examples: {
              missingStatus: {
                value: {
                  message: "Status is required",
                },
              },
              invalidTransition: {
                value: {
                  message: "Cannot change status from todo to done",
                },
              },
              invalidStatus: {
                value: {
                  message: "Status must be todo, doing, or done",
                },
              },
            },
          },
        },
      },
      TaskNotFound: {
        description: "Task not found.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
            example: {
              message: "Task not found",
            },
          },
        },
      },
      InternalServerError: {
        description: "Unexpected server error.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
            example: {
              message: "Internal server error",
            },
          },
        },
      },
    },
    schemas: {
      Task: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "MongoDB ObjectId.",
            example: "66c14e7f5fd2b8a8fb2d3c11",
          },
          title: {
            type: "string",
            description: "Task title.",
            example: "Hoc Express.js",
          },
          description: {
            type: "string",
            description: "Task description.",
            example: "Hoan thanh REST API",
          },
          status: {
            type: "string",
            description: "Task state.",
            enum: ["todo", "doing", "done"],
            example: "todo",
          },
          priority: {
            type: "string",
            description: "Priority level.",
            enum: ["low", "medium", "high"],
            example: "medium",
          },
          dueDate: {
            type: "string",
            nullable: true,
            format: "date-time",
            description: "Due date stored in ISO 8601 format.",
            example: "2026-08-20T00:00:00.000Z",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-16T04:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-16T04:15:00.000Z",
          },
          __v: {
            type: "integer",
            example: 0,
          },
        },
        required: [
          "_id",
          "title",
          "status",
          "priority",
          "createdAt",
          "updatedAt",
          "__v",
        ],
      },
      TaskCreateRequest: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Required task title.",
            example: "Hoc Express.js",
          },
          description: {
            type: "string",
            description: "Optional description.",
            example: "Hoan thanh REST API",
          },
          status: {
            type: "string",
            enum: ["todo", "doing", "done"],
            description: "Optional initial status. Defaults to `todo`.",
            example: "todo",
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high"],
            description: "Optional priority. Defaults to `medium`.",
            example: "high",
          },
          dueDate: {
            type: "string",
            format: "date",
            description: "Optional due date in YYYY-MM-DD format.",
            example: "2026-08-20",
          },
        },
        required: ["title"],
        additionalProperties: true,
      },
      TaskUpdateRequest: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Optional task title.",
            example: "Hoc Express.js nang cao",
          },
          description: {
            type: "string",
            description: "Optional description.",
            example: "Hoan thanh REST API va MongoDB",
          },
          status: {
            type: "string",
            enum: ["todo", "doing", "done"],
            description: "Optional task status.",
            example: "doing",
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high"],
            description: "Optional priority.",
            example: "high",
          },
          dueDate: {
            type: "string",
            format: "date",
            description: "Optional due date in YYYY-MM-DD format.",
            example: "2026-08-25",
          },
        },
        additionalProperties: true,
        description:
          "Partial update payload. The controller passes the body directly to Mongoose `findByIdAndUpdate`.",
      },
      StatusUpdateRequest: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["todo", "doing", "done"],
            description: "Target status.",
            example: "doing",
          },
        },
        required: ["status"],
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Task not found",
          },
        },
        required: ["message"],
      },
    },
    securitySchemes: {},
  },
  security: [],
};
export default swaggerOptions;
