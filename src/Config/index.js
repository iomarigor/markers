import React, {useState,useEffect} from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap';
import {Link } from 'react-router-dom';
let translater = require("../translater.json");
export const Config=()=>{
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
  const [config, setConfig] = useState((localStorage.getItem("Markers"))? JSON.parse(localStorage.getItem("Markers")).config:appInit.config)
  const [strText,setStrText]= useState((localStorage.getItem("Markers"))? JSON.parse(localStorage.getItem("Markers")).config.language:appInit.config.language)
  useEffect(() => {
    const changeLocalStorage=() => {
      if(!localStorage.getItem("Markers")){
        localStorage.setItem("Markers",JSON.stringify(appInit));
    }else{
      let localStatus=JSON.parse(localStorage.getItem("Markers"));
      localStatus.config=config;
      localStorage.setItem("Markers",JSON.stringify(localStatus));
    }
    }
    return changeLocalStorage();
  }, [config])
  return (
    <>
      <Col>
      <Row className='m-1 mt-2'>
        <Col className='col-2'>
          <Link to="/">
            <Button variant="primary"><i className="fa-solid fa-arrow-left"></i></Button>
          </Link>
        </Col>
        <Col className='col-10 text-white fs-5 text-uppercase d-flex align-items-center' style={{paddingLeft:"1.5rem"}}>
          {translater[strText].titleConfig}
        </Col>
      </Row>
      <Row className='m-1 mt-2'>
                <Col className="col-4 align-items-center d-flex">
                  <Form.Label className='text-white fs-5 text-capitalize'>{translater[strText].language}:</Form.Label>
                </Col>
                <Col className="col-8">
                <Form.Select value={config.language} onChange={(e)=>{setConfig({...config,language:e.target.value}); setStrText(e.target.value);}}>
                  <option value={"en"}>English</option>
                  <option value={"es"}>Español</option>
                </Form.Select>
                </Col>
                
            </Row>
      </Col>
    </>
  )
}


