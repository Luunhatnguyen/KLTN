import React,{ useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import API, { endpoints } from "../configs/API";
import Bill from "./Bill";
import cookies from "react-cookies";

function Bills(props) {
  const [bookings, setBooking] = useState([]);
  const [date, setDate] = useState();
  let user = cookies.load('user')

  useEffect(() => {
    let loadBookings = async () => {
      let booking = await API.get(endpoints["booking-pending"](user.id));
      setBooking(booking.data);
    }
    loadBookings();

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd
    setDate(today)

  }, [])

  const deleteBooking = (id) => {
    let booking = bookings.filter((booking) => booking.id != id);
    setBooking(booking);
  }

  return (
    <div style={{ padding: "50px 0", backgroundColor: "white" }}>
      <Container>
        {
          user == null ? (<h1>Xin vui lòng đăng nhập để xem hóa đơn chưa thanh toán</h1>) :
            bookings.length < 1 ? (<h1>Bạn chưa có hóa đơn nào chưa thanh toán!</h1>) :
              bookings.map(e => {
                try {
                  return (<Bill date={e.timeTable.date}
                    time={e.timeTable.time}
                    price={
                      e.discount != undefined && e.timeTable.inflation != undefined  && e.timeTable.inflation.date == date ?
                      e.timeTable.busRouteID.price * (1 - e.discount.percentage + e.timeTable.inflation.percentage) :
                      e.discount != undefined ?
                      e.timeTable.busRouteID.price * (1 - e.discount.percentage) :
                      e.timeTable.inflation != undefined  && e.timeTable.inflation.date == date ?
                      e.timeTable.busRouteID.price * (1 + e.timeTable.inflation.percentage) :
                      e.timeTable.busRouteID.price
                    }
                    busModel={e.timeTable.busRouteID.busID.busModel}
                    from={e.timeTable.busRouteID.routeID.city_from.name}
                    to={e.timeTable.busRouteID.routeID.to_garage.name}
                    detail={e.bookingDetail_booking}
                    id={e.id}
                    deleteBooking={deleteBooking}
                  ></Bill>)
                } catch (error) {
                  return (<Bill error={error}
                  ></Bill>)
                }
              })
        }
      </Container>
    </div>
  )
}

export default Bills;