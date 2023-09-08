import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SubboardTop from './subgameboard/SubboardTop';
import SubboardBottom from './subgameboard/SubboardBottom';

export default function BoardLayout() {
  return (
    <>
      <Row className='cont-r1'>
        <Col 
          className="wrapper wrapper1"
          xs={8}
        >
          <SubboardTop />
        </Col>
      </Row>
       <Row className='cont-r2'>
        <Col 
          className="wrapper wrapper2"
          xs={8}
        >
          <SubboardBottom />
        </Col>
      </Row>
    </>
  )
}
