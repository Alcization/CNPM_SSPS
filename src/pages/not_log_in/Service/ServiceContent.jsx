import React from 'react';
import './ServiceContent.css';
import print_icon from '../../../assets/printer.png'
import check_square_icon from '../../../assets/check-square.png'

const ServiceSection = () => {
  return (
    <div className='servicePage'>
        <h1 className="pageTitle">
            <span className="titleDot"></span>
            Dịch vụ
            <span className="titleDot"></span>
        </h1>
        <section className="serviceSection">

          <article className="serviceCard">
            <img src={print_icon} alt="" className="serviceIcon" />
            <h2 className="serviceTitle">In tài liệu</h2>
            <p className="serviceDescription">Cung cấp dịch vụ in ấn với đa dạng các loại tài liệu</p>
          </article>

          <article className="serviceCard">
            <img src={check_square_icon} alt="" className="serviceIcon" />
            <h2 className="serviceTitle">Nhiều tùy chọn</h2>
            <p className="serviceDescription">Cung cấp nhiều tùy chọn in ấn cho từng tập tin</p>
          </article>
        </section>
    </div>
  );
};

export default ServiceSection;