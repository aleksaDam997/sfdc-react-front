import React, { Component, ReactInstance } from 'react';
import { Button, Form, Modal, Table, Container, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate  } from 'react-router-dom';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import Chart from 'react-apexcharts'
import { ApiResponse, fetch } from '../../api/api';
import "./Body.css";
import { ApexOptions } from 'apexcharts';


interface IProps {}

/**
* @author
* @class @
**/

interface Data {
    dataId: number;
    value1: number;
    value2: number;
    value3: number;
    value4: number;
    value5: number;
    value6: number;
    value7: number;
    createdAt: string;
}

interface Category {
    categoryId: number;
    name: string;
    excerpt: string;
    value1: string;
    value2: string;
    value3: string;
    value4: string;
    value5: string;
    value6: string;
    value7: string;
    data: Data[];
}

interface Cat {
    categoryId: number;
    name: string;
    excerpt: string;
    current: boolean;
}
interface BodyState {
    isLoggedIn: boolean;
    category?: Category;
    categories: Cat[];
    componentRef: ReactInstance | null;
    addModalVisible: boolean;
    apexChartVisible: boolean;
    apexOptions: ApexOptions;

}

export class Body extends Component<IProps> {
 state: BodyState;

 constructor(props: Readonly<{}>) {
     super(props);



     this.state = {
         isLoggedIn: true,
         categories: [],
         componentRef: null,
         addModalVisible: false,
         apexChartVisible: false,
         apexOptions: {
            chart: {
                height: 350,
                type: 'line',
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
              },
            dataLabels: {
                enabled: false
            },
            series: [],
            title: {
                text: 'Ajax Example',
            },
            noData: {
              text: 'Loading...'
            }
            }
            
     }
}

private setLogginState(state: boolean) {
    this.setState(Object.assign(this.state,{
        isLoggedIn: state
    }
    ));
}

private setCategories(categories: Cat[]){

    const cats: Cat[] = [];
    
    categories.map((cat: Cat) => {
        cats.push({
            categoryId: cat.categoryId,
            name: cat.name,
            excerpt: cat.excerpt,
            current: false
        })
    });

    cats[0].current = true;

    this.setState(Object.assign(this.state, {
        categories: cats
    }));
}

private setCategory(category: Category) {

    const dataToSave: Data[] = category.data.map((data: Data) => {
        const setData: Data = {
            dataId: data.dataId,
            value1: data.value1,
            value2: data.value2,
            value3: data.value3,
            value4: data.value4,
            value5: data.value5,
            value6: data.value6,
            value7: data.value7,
            createdAt: data.createdAt
        }

        return setData;
    });

    const categoryToSave: Category = {
        categoryId: category.categoryId,
        name: category.name,
        excerpt: category.excerpt,
        value1: category.value1,
        value2: category.value2,
        value3: category.value3,
        value4: category.value4,
        value5: category.value5,
        value6: category.value6,
        value7: category.value7,
        data: []
    }

    this.setState(Object.assign(this.state, {
        category: categoryToSave
    }))

    this.setData(dataToSave);
    console.log(this.state.category?.data);
}

private setData(dataToSave: Data[]){
    this.setState(Object.assign(this.state, 
        Object.assign(this.state.category!, {
            data: dataToSave
        })));
}

 async componentWillMount(){

    await this.fetchCategories();

    await this.fetchCategory();
  }

  private async fetchCategory(){

    let id: number = this.state.categories[0].categoryId;

    await this.state.categories.map((cat: Cat) => {
        if(cat.current){
            id = cat.categoryId
        }
    })

    fetch(
        "api/category/" + id, "get", {}
    ).then((res: ApiResponse) => {

        if(res.status === 'login' || res.status === 'error'){

            return this.setLogginState(false);
          }

          this.setCategory(res.data);

          this.setChartDetails(res.data);

    }).catch(err => {
        console.log(err);
    });

        
  }

  private setChartDetails(cat: Category) {

    let dates: number[] = [];
    let values: number[] = [];

    cat.data?.map(val => {

        const date = new Date(Number(val.createdAt));
        dates.push(date.getFullYear());

        values.push(val.value1);
    });


  }

  private setChartVisibile(state: boolean) {

    this.setState(
        Object.assign(this.state, {
            apexChartVisible: state
        })
    )
  }

  private updateChart() {

    const data1: number[] = [];
    const data2: number[] = [];
    const data1Xaxis: string[] = [];


    this.state.category?.data.map(dat => {
      data1.push(dat.value1);
      data2.push(dat.value2);

      data1Xaxis.push(new Date(dat.createdAt).getFullYear() + " - " + new Date(dat.createdAt).getMonth());
    // data1Xaxis.push(new Date(dat.createdAt).getFullYear());
    })

    this.setState(Object.assign(this.state, Object.assign(
      this.state.apexOptions, Object.assign(this.state.apexOptions.xaxis, {
        categories: data1Xaxis
      })
    )))

      var chart = new ApexCharts(
        document.getElementById("chart"),
        this.state.apexOptions
      );

      chart.render();



      chart.updateSeries([{
        name: this.state.category?.value1,
        data: data1
      }])

    //   series: [{
    //     name: 'Football'
    //     data: [33, 23, 76, 33]
    //   }, {
    //     name: 'Cricket'
    //     data: [23, 33, 16, 23]
    //   }]


      
  }

  private async fetchCategories() {
    await fetch(
        "api/category/", "get", {}
    ).then((res: ApiResponse) => {

        if(res.status === 'login' || res.status === 'error'){

            return this.setLogginState(false);
          }

          this.setCategories(res.data);
          console.log(res.data);


    }).catch(err => {
        console.log(err);
    });
  }

  
  private selectChange(event: React.ChangeEvent<HTMLSelectElement>){

    let cats: Cat[] = [];

    this.state.categories.map((cat: Cat) => {
        let caT: Cat = {
            categoryId: cat.categoryId,
            name: cat.name,
            excerpt: cat.excerpt,
            current: false
        }

        if(cat.categoryId === Number(event.target.value)){
            caT.current = true;
        }

        cats.push(caT);
    });

    this.setState(Object.assign(this.state, {
        categories: cats
    }));

    console.log(this.state.categories)

  }

  private setAddModalVisible(state: boolean) {
      
    this.setState(Object.assign(this.state, {
        addModalVisible: state
    }))

  }

 render(){
     

    if(this.state.isLoggedIn === false){
        return(
        <Navigate  to="/login" />
        );
      }


  return(
   <Container className='con-body'>
        <Row className='select-width d-flex justify-content-center'>
            <Form.Label htmlFor='state'>Kategorija: </Form.Label>
            <Form.Select id="state" className='select-form' name="state" aria-label="State"  
            onChange={(e: any) => this.selectChange(e as any)}>

                {this.state.categories.map((cat: Cat) => {
                    return(
                        <option value={cat.categoryId}>
                            {cat.name}
                        </option>
                    );
                })}
            </Form.Select>
            <Button variant="primary" 
                onClick={() => this.fetchCategory()}>Filtriraj</Button>
                 <Button variant="success" onClick={() => this.setAddModalVisible(true)}>
                    Add category
                    </Button> 
            <ReactToPrint  trigger={() =><Button variant="danger">
              Printaj
            </Button>}
            content={() => this.state.componentRef}/>
             <Button variant="secondary" onClick={() => this.setChartVisibile(true)}>Graff..</Button>
        </Row>
       <Table variant="light" striped bordered hover ref={el => (this.state.componentRef = el)} >
        <thead>
            <tr>
                <th className='data-id'>Podatak id</th>
                <th>Kreirano</th>
                <th className= {(this.state.category?.value1 === null) ? 'd-none' : '' }>{this.state.category?.value1}</th>
                <th className={(this.state.category?.value2 === null) ? 'd-none' : '' }>{this.state.category?.value2}</th>
                <th className={(this.state.category?.value3 === null) ? 'd-none' : '' }>{this.state.category?.value3}</th>
                <th className={(this.state.category?.value4 === null) ? 'd-none' : '' }>{this.state.category?.value4}</th>
                <th className={(this.state.category?.value5 === null) ? 'd-none' : '' }>{this.state.category?.value5}</th>
                <th className={(this.state.category?.value6 === null) ? 'd-none' : '' }>{this.state.category?.value6}</th>
                <th className={(this.state.category?.value7 === null) ? 'd-none' : '' }>{this.state.category?.value7}</th>
            </tr>
        </thead>
        <tbody>
            {this.state.category?.data.map((data: Data) => {
                return(
                    <tr>
                        <td className='data-id'>{data.dataId}</td>
                        <td>{data.createdAt}</td>
                        <td className={(data.value1 === -1000) ? 'd-none' : ''}>{data.value1}</td>
                        <td className={(data.value2 === -1000) ? 'd-none' : ''}>{data.value2}</td>
                        <td className={(data.value3 === -1000) ? 'd-none' : ''}>{data.value3}</td>
                        <td className={(data.value4 === -1000) ? 'd-none' : ''}>{data.value4}</td>
                        <td className={(data.value5 === -1000) ? 'd-none' : ''}>{data.value5}</td>
                        <td className={(data.value6 === -1000) ? 'd-none' : ''}>{data.value6}</td>
                        <td className={(data.value7 === -1000) ? 'd-none' : ''}>{data.value7}</td>
                    </tr>
                );
            })}
        </tbody>
        </Table>
        <Modal size="lg" centered show={this.state.addModalVisible} onHide={() => this.setAddModalVisible(false)}>
            <Modal.Header closeButton>
                  <Modal.Title>
                   Add Article
                  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                      <Form.Label htmlFor="name">Name</Form.Label>
                      <Form.Control id="name" type="text" ></Form.Control>
                </Form.Group>     
                <Form.Group>
                      <Form.Label htmlFor="excerpt">Excerpt</Form.Label>
                      <Form.Control id="excerpt" type="text" ></Form.Control>
                </Form.Group>     
                <Form.Group>
                      <Form.Label htmlFor="value1">Name for value 1</Form.Label>
                      <Form.Control id="value1" type="text" ></Form.Control>
                </Form.Group>    
                <Form.Group>
                      <Form.Label htmlFor="value2">Name for value 2</Form.Label>
                      <Form.Control id="value2" type="text" ></Form.Control>
                </Form.Group>    
                <Form.Group>
                      <Form.Label htmlFor="value3">Name for value 3</Form.Label>
                      <Form.Control id="value3" type="text" ></Form.Control>
                </Form.Group>    
                <Form.Group>
                      <Form.Label htmlFor="value4">Name for value 4</Form.Label>
                      <Form.Control id="value4" type="text" ></Form.Control>
                </Form.Group>    
                <Form.Group>
                      <Form.Label htmlFor="value5">Name for value 5</Form.Label>
                      <Form.Control id="value5" type="text" ></Form.Control>
                </Form.Group>    
                <Form.Group>
                      <Form.Label htmlFor="value6">Name for value 6</Form.Label>
                      <Form.Control id="value6" type="text" ></Form.Control>
                </Form.Group>    
                <Form.Group>
                      <Form.Label htmlFor="value7">Name for value 7</Form.Label>
                      <Form.Control id="value7" type="text" ></Form.Control>
                </Form.Group>    
                <Form.Group>
                    <Button variant="primary">
                        Save
                    </Button>
                </Form.Group>
            </Modal.Body>
        </Modal>
        <Modal size="lg" centered show={this.state.apexChartVisible} onHide={() => this.setChartVisibile(false)}>
            <Modal.Header closeButton>
                  <Modal.Title>
                   Graf..
                  </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                <div className='mixed-chart w-100 h-100'>
                <Chart id="chart"
                    options={this.state.apexOptions}
                    series={this.state.apexOptions.series}
                    type="line"
                    width="500"

                />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.updateChart()}>
                    Azuriraj graf
                </Button>
            </Modal.Footer>
        </Modal>

   </Container>
    )
}
}