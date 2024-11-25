import React from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';



function AddPrinter() {
    const navigate = useNavigate();

    const toCancel = () => {
        navigate('/admin/printer_info');
    };

    async function toAddPrinter(formData) {
        // conncet to backend
        // const manufacturer = formData.get('manufacturer')
        // const model = formData.get('model')
        // const building = formData.get('building')
        // const room = formData.get('room')
        // const description = formData.get('description')
        // await insertPrinter()
        navigate('/admin/printer_info');
    }
    const options = [
        { value: 'h1', label: 'H1' },
        { value: 'h2', label: 'H2' },
        { value: 'h3', label: 'H3' },
        { value: 'h6', label: 'H6' },
    ];

    return (
        <div className='d-flex justify-content-center align-items-center m-4 p-4'>
            <form action={toAddPrinter} className='addPrinterForm'>
                <h1 style={{marginLeft: '2rem'}}>Thêm máy in mới</h1>

                {/* Placeholder for new printer */}
                <div className='d-flex flex-column mt-3'>
                    <label htmlFor="">Mã số</label>
                    <input type="text" className='rounded border border-2' disabled={true} placeholder='11' style={{height: '3rem', paddingLeft: '1rem', paddingRight: '1rem'}}/>

                </div>

                <div className='d-flex flex-column mt-3'>
                    <label htmlFor="">Hãng sản xuất</label> 
                    <input type="text" name='manufacturer' className='rounded border border-2' style={{height: '3rem', paddingLeft: '1rem', paddingRight: '1rem'}} />
                </div>

                <div className='d-flex flex-column mt-3'>
                    <label htmlFor="">Mẫu mã</label>
                    <input type="text" name='model' className='rounded border border-2' style={{height: '3rem', paddingLeft: '1rem', paddingRight: '1rem'}} />
                </div>

                <div className='d-flex flex-row gap-2 mt-3'>
                    <div className='d-flex flex-column'>
                        <label htmlFor="">Tòa nhà</label>
                        <div style={{width: '8rem'}}>
                            <Select name='building' className='rounded' options={options} />
                        </div>
                    </div>

                    <div className='d-flex flex-column'>
                        <label htmlFor="">Phòng</label>
                        <input type="text" name='room' className='rounded border border-2' style={{height: '36px', paddingLeft: '1rem', paddingRight: '1rem'}}/>
                    </div>
                </div>

                <div className='d-flex flex-column mt-3'>
                    <label htmlFor="">Mô tả</label>
                    <textarea className='rounded' name="description" id="" rows={10} placeholder = "Thêm phần mô tả" maxLength = {200} style={{height: '10rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem'}}></textarea>
                </div>
                <Button type='button' className='btn btn-danger' style={{margin: '3rem', marginLeft: '3rem'}} onClick={() => toCancel()}>Hủy bỏ</Button>
                <Button type='submit' className='btn btn-primary' style={{margin: '3rem', marginLeft: '3rem'}}>Thêm máy in</Button>
            </form>

        </div>
    )
}
export default AddPrinter;