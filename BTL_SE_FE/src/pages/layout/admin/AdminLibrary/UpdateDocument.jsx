import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from '../../../../assets/upload.svg'
const UpdateDocumnet = () => {
  const [formData, setFormData] = useState({
    id: '0357',
    courseCode: '',
    semester: '',
    documentName: '',
    file: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic upload tại đây
    console.log('Form data:', formData);
  };

  const handleCancel = () => {
    setFormData({
      id: '0357',
      courseCode: '',
      semester: '',
      documentName: '',
      file: null
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Chỉnh sửa tài liệu</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Mã số (ID)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mã môn học</label>
                  <input
                    type="text"
                    className="form-control"
                    name="courseCode"
                    value={formData.courseCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Học kỳ</label>
                  <input
                    type="text"
                    className="form-control"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tên tài liệu</label>
                  <input
                    type="text"
                    className="form-control"
                    name="documentName"
                    value={formData.documentName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Upload</label>
                  <div className="border rounded p-3 text-center">
                    <div className="mb-3">
                      <img
                      src={Upload}
                        alt="Upload icon"
                        style={{ width: '64px', height: '64px' }}
                      />
                    </div>
                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <button type="submit" className="btn btn-primary px-4">
                    Thêm tài liệu
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger px-4"
                    onClick={handleCancel}
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDocumnet;