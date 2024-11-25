import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import Contentjson from './contentjson.json';

function UpdatePrinter() {
    const location = useLocation();
    const navigate = useNavigate();

    const toCancel = () => {
        navigate('/admin/printer_info');
    };

    async function toUpdatePrinter(formData) {
        // connect to backend
        // const printerID = formData.get('printer_id')
        const manufacturer = formData.get('manufacturer')
        const model = formData.get('model')
        const building = formData.get('building')
        const room = formData.get('room')
        const description = formData.get('description')
        // await updatePrinter()
        navigate('/admin/printer_info');
    }
    const options = [
        { value: 'H1', label: 'H1' },
        { value: 'H2', label: 'H2' },
        { value: 'H3', label: 'H3' },
        { value: 'H6', label: 'H6' },
    ];

    const DisplayData = Contentjson.map((info) => {
        if (info.id === location.state.id) {
            return (
                <form action={toUpdatePrinter} className='addPrinterForm'>
                    <h1 style={{marginLeft: '2rem'}}>Chỉnh sửa máy in</h1>

                    <div className='d-flex flex-column mt-3'>
                        <label htmlFor="">Mã số</label>
                        <input type="text" name='printer_id' className='rounded border border-2' disabled={true} placeholder={info.id} style={{height: '3rem', paddingLeft: '1rem', paddingRight: '1rem'}}/>

                    </div>

                    <div className='d-flex flex-column mt-3'>
                        <label htmlFor="">Hãng sản xuất</label> 
                        <input type="text" name='manufacturer' defaultValue={info.manufacturer} className='rounded border border-2' style={{height: '3rem', paddingLeft: '1rem', paddingRight: '1rem'}} />
                    </div>

                    <div className='d-flex flex-column mt-3'>
                        <label htmlFor="">Mẫu mã</label>
                        <input type="text" name='model' defaultValue={info.model} className='rounded border border-2' style={{height: '3rem', paddingLeft: '1rem', paddingRight: '1rem'}} />
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
                            <input type="text" name='room' defaultValue={info.room} className='rounded border border-2' style={{height: '36px', paddingLeft: '1rem', paddingRight: '1rem'}}/>
                        </div>
                    </div>

                    <div className='d-flex flex-column mt-3'>
                        <label htmlFor="">Mô tả</label>
                        <textarea defaultValue={info.description} className='rounded' name="description" id="" rows={10} maxLength = {200} style={{height: '10rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem'}}></textarea>
                    </div>
                    <Button type='button' className='btn btn-danger' style={{margin: '3rem', marginLeft: '3rem'}} onClick={() => toCancel()}>Hủy bỏ</Button>
                    <Button type='submit' className='btn btn-primary' style={{margin: '3rem', marginLeft: '3rem'}}>Chỉnh sửa</Button>
                </form>
            )
        }
    });

    return (
        <div className='d-flex justify-content-center align-items-center m-4 p-4'>
            {DisplayData}
        </div>
    )
}
export default UpdatePrinter;