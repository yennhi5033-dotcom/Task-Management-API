import Task from "../models/taskModels.js";
export const createTask = (data) => Task.create(data);
export const getAllTasks = () => Task.find();
export const getTaskById = (id) => Task.findById(id);
export const deleteTask = (id) => Task.findByIdAndDelete(id);
export const updateTask = (id, data) =>
  Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

export const updateStatus = async (id, newStatus) => {
  const task = await Task.findById(id);

  if (!task) {
    return null;
  }

  const currentStatus = task.status;

  // Thứ tự trạng thái
  const statusOrder = {
    todo: 0,
    doing: 1,
    done: 2,
  };

  // Kiểm tra status mới
  if (!statusOrder.hasOwnProperty(newStatus)) {
    throw new Error("Status must be todo, doing, or done");
  }

  // Chỉ cho phép chuyển sang trạng thái kế tiếp
  if (statusOrder[newStatus] !== statusOrder[currentStatus] + 1) {
    throw new Error(
      `Cannot change status from ${currentStatus} to ${newStatus}`
    );
  }

  task.status = newStatus;

  return await task.save();
};
// xử lý dữ liệu  và kết nối db 
