import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Admin from "./AdminCarrier";
import API, { endpoints } from "../configs/API";
import { Col, Form, Row } from "react-bootstrap";
const AddArtical = () => {
  let navigate = useNavigate();
  const [bus, setBus] = useState([]);
  const [router, setRouter] = useState([]);

  const [active, setActive] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [updateDate, setUpdateDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [busID, setBusID] = useState(null);
  const [routeID, setRouteID] = useState(null);

  useEffect(() => {
    let loadArticals = async () => {
      try {
        let res = await API.get(endpoints["buss"]);
        setBus(res.data.results);

        let res1 = await API.get(endpoints["router"]);
        setRouter(res1.data.results);
        console.log(res1.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadArticals();
  }, []);

  const addBusRoute = async () => {
    let formField = new FormData();

    formField.append("price", price);
    formField.append("busID", busID);
    formField.append("routeID", routeID);

    //thêm bài viết
    await axios({
      method: "post",
      url: "http://localhost:8000/busroute_post/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      navigate("/carrier");
    });
  };

  return (
    <>
      <Admin />

      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Thêm một chuyến đi</h2>

        {/* <div className="form-group">
          <label>Active</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setActive(e.target.value)}
            min="0"
            max="1"
          />
        </div> */}
        {/* <div className="form-group">
          <label>Ngày tạo</label>
          <input
            type="date"
            className="form-control "
            placeholder="Ngày tạo"
            name="name"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Ngày cập nhật</label>
          <input
            type="date"
            className="form-control"
            placeholder="Ngày cập nhật"
            name="name"
            value={updateDate}
            onChange={(e) => setUpdateDate(e.target.value)}
          />
        </div> */}

        <div className="form-group">
          <label>Nhập Giá</label>
          <input
            type="number"
            className="form-control"
            placeholder="800,000"
            name="name"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <Form.Group className="form-group">
          <label>Chọn nhà xe</label>
          <Form.Select value={busID} onChange={(e) => setBusID(e.target.value)}>
            <option value="0" selected="selected">
              Chọn nhà xe
            </option>
            {bus.map((c) => {
              return <option value={c.id}>{c.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group">
          <label>Chọn chuyến đi</label>
          <Form.Select
            value={routeID}
            onChange={(e) => setRouteID(e.target.value)}
          >
            <option value="0" selected="selected">
              Chọn chuyến đi
            </option>
            {router.map((c) => {
              return (
                <option value={c.id}>
                  {c.city_from.name} - {c.to_garage.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <button className="btn btn-primary btn-block" onClick={addBusRoute}>
          Thêm chuyến đi
        </button>
      </div>
    </>
  );
};

export default AddArtical;
