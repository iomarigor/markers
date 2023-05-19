import React, {useState, useEffect} from 'react'
import { Modal, Row, Col, Button, Form, Image  } from 'react-bootstrap';
function AddLink({show,handleClose}) {
    let chrome = (window)["chrome"];
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
    const [profileSelect, setProfileSelect] = useState((localStorage.getItem("Markers"))? JSON.parse(localStorage.getItem("Markers")).config.profile:appInit.config.profile);
    const [store, setStore] = useState((localStorage.getItem("Markers"))? JSON.parse(localStorage.getItem("Markers")).store:appInit.store)
    const [dirSelect, setDirSelect] = useState(0);

    useEffect(() => {
        
            console.log(store[profileSelect].dir)
        
    },[dirSelect,show]);
  return (
    <Modal show={show} onHide={handleClose}>
        
        <Modal.Body>
            <form onSubmit={(e)=>{console.log("form submit");e.preventDefault();}}>
                <Row className='d-flex justify-content-end'>
                    <Col className='col-2'>
                        <a className='p-2 hover-light2 text-white' onClick={handleClose} style={{ cursor: "pointer", textDecoration: 'none'}}>
                            X
                        </a>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-beetwen'>
                    <Col>
                        <Button variant="primary" type='submit' onClick={handleClose}>
                            Save
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-10'>
                        <Form.Select value={dirSelect} onChange={(e)=>{setDirSelect(e.target.value)}}>
                            {
                                store[profileSelect].dir.map((item,index)=><option key={index} value={index}>{item.name}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Row>
            </form>
            
        </Modal.Body>
        
      </Modal>
  )
}

export default AddLink
