  const express = require("express");
  const store = require("../data/tasksDB");

  const router = express.Router();

  const VALID_PRIORITIES = ["low", "medium", "high"];

  // helper function to create error objects with status codes
  function makeError(statusCode, message) {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
  }

  // routes
  // GET /api/tasks - get all tasks
  // POST /api/tasks - create a new task
  // PUT /api/tasks/:id - update a task by id
  // DELETE /api/tasks/:id - delete a task by id
  // PATCH /api/tasks/:id/toggle - toggle completed status of a task by id
  
  router.get("/", (req, res) => {
    res.json(store.getAll());
  });

  router.post("/", (req, res, next) => {
    const { title, description, priority } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      return next(makeError(400, "title is required"));
    }

    if (typeof priority !== "string" || !VALID_PRIORITIES.includes(priority)) {
      return next(makeError(400, "priority must be low, medium, or high"));
    }

    if (description !== undefined && typeof description !== "string") {
      return next(makeError(400, "description must be a string"));
    }

    const created = store.create({
      title: title.trim(),
      description,
      priority,
    });

    return res.status(201).json(created);
  });

  router.put("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return next(makeError(400, "invalid id"));
    }

    const { title, description, priority, completed } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      return next(makeError(400, "title is required"));
    }

    if (typeof priority !== "string" || !VALID_PRIORITIES.includes(priority)) {
      return next(makeError(400, "priority must be low, medium, or high"));
    }

    if (description !== undefined && typeof description !== "string") {
      return next(makeError(400, "description must be a string"));
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return next(makeError(400, "completed must be boolean"));
    }

    const updated = store.updateById(id, {
      title: title.trim(),
      description: description || "",
      priority,
      completed,
    });

    if (!updated) {
      return next(makeError(404, "task not found"));
    }

    return res.json(updated);
  });

  router.delete("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return next(makeError(400, "invalid id"));
    }

    const ok = store.deleteById(id);
    if (!ok) {
      return next(makeError(404, "task not found"));
    }

    return res.status(204).send();
  });

  router.patch("/:id/toggle", (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return next(makeError(400, "invalid id"));
    }

    const toggled = store.toggleById(id);
    if (!toggled) {
      return next(makeError(404, "task not found"));
    }

    return res.json(toggled);
  });

  module.exports = router;