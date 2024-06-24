import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JobTodo } from '../interface';

export default function Job() {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>("");
  const [completedCount, setCompletedCount] = useState<number>(0);
  const dispatch = useDispatch();

  const jobs: JobTodo[] = useSelector((state: any) => state.jobReducer);

  useEffect(() => {
    const count = jobs.filter(job => job.status).length;
    setCompletedCount(count);
  }, [jobs]);

  const handleChangeNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleChangeNewLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLevel(value);
  };

  const handleFilterLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterLevel(value);
  };

  const handleSave = () => {
    if (currentJobId === null) {
      let newJob = {
        id: Math.floor(Math.random() * 9999999),
        name: name,
        status: false,
        level: level
      };
      dispatch({
        type: "ADD_TODO",
        payload: newJob
      });
    } else {
      dispatch({
        type: "UPDATE_TODO",
        payload: {
          id: currentJobId,
          name: name,
          level: level
        }
      });
      setCurrentJobId(null);
    }
    setName("");
    setLevel("");
  };

  const loadJobDetails = (id: number) => {
    const job = jobs.find(job => job.id === id);
    if (job) {
      setName(job.name);
      setLevel(job.level);
      setCurrentJobId(job.id);
    }
  };

  const deleteJob = (id: number) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa công việc này?");
    if (isConfirmed) {
      dispatch({
        type: "DELETE_TODO",
        payload: id
      });
    }
  };

  const toggleCompleteStatus = (id: number) => {
    dispatch({
      type: "TOGGLE_STATUS_TODO",
      payload: id
    });
  };

  const markAllAsCompleted = () => {
    dispatch({
      type: "MARK_ALL_COMPLETED"
    });
  };

  const deleteAllJobs = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa tất cả công việc?");
    if (isConfirmed) {
      dispatch({
        type: "DELETE_ALL_JOBS"
      });
    }
  };

  const filteredJobs = filterLevel ? jobs.filter(job => job.level === filterLevel) : jobs;

  // Determine display text based on completedCount and total job count
  const displayText = completedCount === jobs.length ? "Tất cả công việc đã được hoàn thành" : `Số công việc hoàn thành: ${completedCount}`;

  return (
    <>
      <div>
        <label htmlFor="">Tên công việc</label>
        <input value={name} type="text" onChange={handleChangeNewName} />
        <select value={level} onChange={handleChangeNewLevel}>
          <option value="">Chọn cấp độ</option>
          <option value="veryImportant">Khẩn cấp</option>
          <option value="important">Quan trọng</option>
          <option value="normal">Bình thường</option>
          <option value="unImportant">Không quan trọng</option>
        </select>
        <button onClick={handleSave}>
          {currentJobId === null ? 'Thêm công việc' : 'Cập nhật công việc'}
        </button>
      </div>
      <div>
        <select value={filterLevel} onChange={handleFilterLevel}>
          <option value="">Lọc theo cấp độ</option>
          <option value="veryImportant">Khẩn cấp</option>
          <option value="important">Quan trọng</option>
          <option value="normal">Bình thường</option>
          <option value="unImportant">Không quan trọng</option>
        </select>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên công việc</th>
            <th>Trạng thái</th>
            <th>Mức độ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job: JobTodo, index: number) => (
            <tr key={job.id}>
              <td>{index + 1}</td>
              <td>{job.name}</td>
              <td>
                <input 
                  type="checkbox" 
                  checked={job.status} 
                  onChange={() => toggleCompleteStatus(job.id)} 
                /> 
                {job.status ? "Hoàn thành" : "Chưa hoàn thành"}
              </td>
              <td>{job.level}</td>
              <td>
                <button onClick={() => loadJobDetails(job.id)}>Sửa</button>
                <button onClick={() => deleteJob(job.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div>{displayText}</div>
        <button onClick={markAllAsCompleted}>Hoàn thành tất cả</button>
        <button onClick={deleteAllJobs}>Xóa tất cả</button>
      </div>
    </>
  );
}
