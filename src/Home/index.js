import React, {useState,useEffect} from 'react'
import { Row, Col, Button, Form, Image  } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import AddLink from './modals/AddLink.js';
let translater = require("../translater.json");

export const Home=()=>{
    const appInit={
        config: {
            language: "en",
            profile:0
        },
        store:[
            {
                name:"Default",
                dir:[
                    {
                        name:"JS",
                        link:[
                            {
                                name:"Import JSON file in React",
                                link:"https://stackoverflow.com/questions/39686035/import-json-file-in-react",
                                description:"Stack Overflow | Import JSON file in React |react",
                                icon:"https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
                            },
                            {
                                name:"El sueño de PABLO ESCOBAR: ¿Está BÉLGICA volviéndose un NARCOESTADO? - VisualPolitik",
                                link:"https://www.youtube.com/watch?v=1JtPL-N4F7o",
                                description:"El sueño de PABLO ESCOBAR: ¿Está BÉLGICA volviéndose un NARCOESTADO? - VisualPolitik",
                                icon:"https://www.youtube.com/s/desktop/b709e77b/img/favicon.ico"
                            }
                        ]
                    }
                ]
            },
            {
                name:"Dev",
                dir:[]
            }
        ]
    }
    const [store, setStore] = useState((localStorage.getItem("Markers"))? JSON.parse(localStorage.getItem("Markers")).store:appInit.store)
    const [strText,setStrText]= useState((localStorage.getItem("Markers"))? JSON.parse(localStorage.getItem("Markers")).config.language:appInit.config.language)
    const [profileSelect, setProfileSelect] = useState((localStorage.getItem("Markers"))? JSON.parse(localStorage.getItem("Markers")).config.profile:appInit.config.profile)
    const [dirSelect, setDirSelect] = useState([]);
    const [addLinkM, setAddLinkM] = useState(false);
    let chrome = (window)["chrome"];
    useEffect(() => {
      return () => {
        if(!localStorage.getItem("Markers")){
            localStorage.setItem("Markers",JSON.stringify(appInit));
        }
      }
    }, [store])
    useEffect(()=>{
        const changeLocalStorage=() => {
        if(!localStorage.getItem("Markers")){
              localStorage.setItem("Markers",JSON.stringify(appInit));
          }else{
            let localStatus=JSON.parse(localStorage.getItem("Markers"));
            localStatus.config.profile=profileSelect;
            localStorage.setItem("Markers",JSON.stringify(localStatus));
          }
          }
          return changeLocalStorage();
        },[profileSelect]
    );
    
  return (
    <>
        <Col>
            <Row className='m-1 mt-2'>
                <Col className="col-10">
                <Form.Select value={profileSelect} onChange={(e)=>{setProfileSelect(e.target.value)}}>
                    {
                        store.map((item,index)=><option key={index} value={index}>{item.name}</option>)
                    }
                </Form.Select>
                </Col>
                <Col className="col-2 justify-content-end d-flex">
                    <Button variant="primary" onClick={()=>{setAddLinkM(true)}}><i className="fa-solid fa-plus"></i></Button>
                </Col>
            </Row>
            <Row className='m-1 mt-2'>
                <Col>
                    <Form.Control type="text" placeholder={translater[strText].search} />
                </Col>
                
            </Row>
            <div className='m-1 mt-2' style={{ width:"97%", height:"390px", position:"relative"}}>
                    <div className='overflow-auto' style={{ width:"100%", height:"390px", position:"absolute"}}>
                        {
                            store[0].dir.map((item,index)=>{
                                return(
                                    <>
                                        <p key={index} 
                                        onClick={
                                            ()=>{
                                                if(dirSelect.indexOf(index)==0){
                                                    setDirSelect(dirSelect.filter(e=>e!=index))
                                                }else{
                                                    setDirSelect([...dirSelect,index])
                                                }}}  className="p-2 text-white fs-6 my-1" style={{width:"100%",  cursor: "pointer"}}><i className={(dirSelect.indexOf(index)==0)?"fa-solid fa-folder-open p-1":"fa-solid fa-folder p-1"}></i>{item.name}</p>
                                        {
                                            (dirSelect.indexOf(index)==0)?
                                            item.link.map((item2,index2)=><p key={index2} onClick={()=>{
                                                
                                                    chrome.tabs.create({
                                                        url: item2.link,
                                                        active: false 
                                                    }, function(tab) {
                                                        /* ... */
                                                    });
                                            }}  className="ps-4 m-0 text-white fs-7 hover-light" style={{width:"100%", cursor: "pointer"}}> <p className='border-start border-bottom m-0 ps-1 py-1'><Image width="24px" height="24px" co src={item2.icon}/> {item2.name}</p></p>)
                                            :
                                            <></>
                                        }
                                    </>
                                );
                            }
                            )
                        }
                    </div>
            </div>
        </Col>
        <Link to="/config">
        <Button variant="dark" style={{position:"absolute", bottom:"10px", right:"10px"}}><i className="fa-solid fa-gear"></i></Button>
        </Link>
        {
            (addLinkM)?
                <AddLink show={addLinkM} handleClose={()=>{setAddLinkM(false);}}/>
            :
            <></>
        }
        
    </>
  )
}


