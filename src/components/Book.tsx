import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addBook, updateBook, deleteBook } from '../store/actions/bookActions';
import './Book.css';

const Book: React.FC = () => {
  const books = useSelector((state: RootState) => state.bookReducer);
  const dispatch = useDispatch();

  const [bookTitle, setBookTitle] = useState('');
  const [studentName, setStudentName] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>(''); 
  const handleAddOrUpdateBook = () => {
    if (editingBookId === null) {
      dispatch(addBook({ title: bookTitle, student: studentName, borrowDate, returnDate, status: false }));
    } else {
      dispatch(updateBook({ id: editingBookId, title: bookTitle, student: studentName, borrowDate, returnDate, status: false }));
      setEditingBookId(null);
    }
    setBookTitle('');
    setStudentName('');
    setBorrowDate('');
    setReturnDate('');
  };

  const handleEdit = (book: any) => {
    setEditingBookId(book.id);
    setBookTitle(book.title);
    setStudentName(book.student);
    setBorrowDate(book.borrowDate);
    setReturnDate(book.returnDate);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteBook(id));
  };

  const handleStatusChange = (bookId: number, newStatus: boolean) => {
    const updatedBook = books.find(book => book.id === bookId);
    if (updatedBook) {
      updatedBook.status = newStatus;
      dispatch(updateBook(updatedBook));
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const filteredBooks = filterStatus === ''
    ? books
    : books.filter(book => (filterStatus === 'returned' && book.status) || (filterStatus === 'not-returned' && !book.status));

  return (
    <div className="book-management">
      <h2>Quản lý mượn trả sách</h2>
      <select name="" id="" value={filterStatus} onChange={handleFilterChange}>
        <option value="">Lọc theo trạng thái</option>
        <option value="returned">Đã trả</option>
        <option value="not-returned">Chưa trả</option>
      </select>
      <div>
        <input type="text" placeholder="Tên sách" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
        <input type="text" placeholder="Tên người mượn" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        <input type="date" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} />
        <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        <button onClick={handleAddOrUpdateBook}>{editingBookId === null ? 'Thêm thông tin' : 'Cập nhật'}</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.student}</td>
              <td>{book.borrowDate}</td>
              <td>{book.returnDate}</td>
              <td>
                <select
                  value={book.status ? 'returned' : 'not-returned'}
                  onChange={(e) => handleStatusChange(book.id, e.target.value === 'returned')}
                >
                  <option value="returned">Đã trả</option>
                  <option value="not-returned">Chưa trả</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleEdit(book)}>Sửa</button>
                <button onClick={() => handleDelete(book.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Book;