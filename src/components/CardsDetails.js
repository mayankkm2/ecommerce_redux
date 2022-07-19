import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { DLT } from './actions/action';
import { useNavigate } from "react-router-dom";
import { ADD,REMOVE } from './actions/action';


const CardsDetails = () => {

   const history = useNavigate();

   const [data, setData] = useState([]);
   // console.log(data);

   const dispatch = useDispatch();

   const { id } = useParams();
   //console.log(id);

   const getdata = useSelector((state) => state.cartreducer.carts);
   //console.log(getdata);

   //comparin above two ids
   const compare = () => {
      let comparedata = getdata.filter((e) => {
         return e.id == id;
      });
      setData(comparedata);
   }

   useEffect(() => { //clicked id data
      compare();
   }, [id]);

   //add qnty
   const send = (e) => {
      //console.log(e);
      dispatch(ADD(e));
     }
   
     const rmv = (item) => {
      dispatch(REMOVE(item));
     }

   const dlt = (id) => {
      dispatch(DLT(id));
      history("/");
   }

   return (
      <>
         <div className="container mt-2">
            <h2 className="text-center"> Items Page</h2>

            <section className="cntainer mt-3">
               <div className="iteamsdetails">

                  {
                     data.map((ele) => {
                        return (
                           <>
                              <div className="items_img">
                                 <img src={ele.imgdata}></img>
                              </div>
                              <div className="details">
                                 <Table>
                                    <tr>
                                       <td>
                                          <p> <strong>Restaurant</strong> :{ele.rname}</p>
                                          <p> <strong>Price</strong> ₹{ele.price}</p>
                                          <p> <strong>Dishes</strong> {ele.address}</p>

                                          <p> <strong>Total</strong> ₹{ele.price * ele.qnty} </p>
                                          <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                             <span style={{ fontSize: 24 }} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : () => rmv(ele)}>-</span>
                                             <span style={{ fontSize: 24 }}>{ele.qnty}</span>
                                             <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>
                                          </div>
                                       </td>
                                       <td>
                                          <p> <strong>Rating</strong> <span style={{ background: "green", color: "#fff", padding: "2px, 5px" }}>{ele.rating}★</span></p>
                                          <p> <strong>Order Review </strong> <span>{ele.somedata}</span></p>
                                          <p> <strong>Remove</strong> <span> <i className='fas fa-trash' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(ele.id)} ></i> </span></p>

                                       </td>
                                    </tr>
                                 </Table>

                              </div>
                           </>
                        )
                     })
                  }




               </div>
            </section>
         </div>
      </>

   );
}

export default CardsDetails;