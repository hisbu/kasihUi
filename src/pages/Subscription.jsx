import React, { Component } from 'react';
import Numeral from 'numeral'
import { connect } from 'react-redux'
import { getSub, applySub } from '../redux/actions' 
import { Redirect, Link } from 'react-router-dom'
import { Switch } from '@material-ui/core'
import { InputGroup, InputGroupAddon, Button, Input, Progress } from 'reactstrap';
import Axios from 'axios'
import { URL_API } from '../helpers/Url_API';


class Subscription extends Component {
    state = { 
        redirectHome: false,
        lain : false,
        nominal : 0,
        nominalDisplay : '0',
        scholarshipList : []
    }

    componentDidMount(){
        if(!this.props.email){
            return this.setState({ redirectHome: true })
        }
        this.props.getSub(this.props.email)
        // this.getScholarshipList()
        // console.log(this.props.applySub())
    }

   
    
    formatDisplay (num) {
        let number = parseInt(num.split(',').join('')) 

        if (num.split(',').join('') === '' ) {
            this.setState({nominalDisplay: '0', nominal: 0})
        } else {
            this.setState({
                nominalDisplay: number.toLocaleString(),
                nominal: number
            })
        }
    }

    getSubPrice = () => {

        if(this.state.nominal < 10000){
            return window.alert('Harus diatas Rp. 10.000')
        }
        
        return this.props.applySub(this.state.nominal, this.props.email)

    }
    
    renderMidtrans = () =>{
        if(!this.props.email){
            return null
        }
        // var date = this.refs.inputremainderdate.value
        // console.log(date)
        // var randInt = Math.floor(Math.random()*(999-100+1)+100)
        var gross_amount = 0
        if(this.state.lain){
            // var subPriceBebas = this.refs.nominalBebas.value
            
            gross_amount = parseInt(this.state.nominal)
        }else{
            gross_amount = this.refs.nominal.value
        }

        //console.log(gross_amount)

        this.props.applySub(gross_amount, this.props.email, this.reminderDate.value)
        alert('Anda berhasil Subscribe. Terima Kasih')
        this.setState({
            redirectHome: true
        })
    }

    handleChange = () => {
        var check = this.state.lain
        this.setState({ lain: !check })
    } 

    
    allowPositivesOnly(event) {
        return (event.keyCode? (parseInt(event.keyCode) === 69 ? false : event.keyCode >= 48 && event.keyCode <= 57) : (event.charCode >= 48 && event.charCode <= 57))? true : event.preventDefault();
    }

    render() { 
   
     
        return ( 
            <div className='container'>
                <form style={{width: '100%'}}>
                    <div className='form-group'>
             
                    <label for="exampleInputEmail1">Silahkan pilih jumlah nominal langganan</label>
                    <select className='form-control' name="select" ref='nominal' hidden={this.state.lain}>
                        <option value={100000}>Rp.{Numeral(100000).format('0,0')}</option>
                        <option value={250000}>Rp.{Numeral(250000).format('0,0')}</option>
                        <option value={500000}>Rp.{Numeral(500000).format('0,0')}</option>
                        <option value={750000}>Rp.{Numeral(750000).format('0,0')}</option>
                        <option value={1000000}>Rp.{Numeral(1000000).format('0,0')}</option>
                    </select>
              
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <Button className="bg-white text-dark border-right-0"  hidden={!this.state.lain} disabled style={{borderColor : '#CED4DA' , border : '1px solid #CED4DA', opacity: 1}}>Rp. </Button>
                            </InputGroupAddon>
                            <Input style={{border : '1px 1px 1px 0 solid #CED4DA'}} hidden={!this.state.lain} innerRef='nominalBebas' ref='nominalBebas' onChange={(text)=>this.formatDisplay(text.target.value)} onKeyPress={this.allowPositivesOnly} value={this.state.nominalDisplay}/>
                        </InputGroup>
                        {/* <input type='text' hidden={!this.state.lain} defaultValue={`Rp. ${this.state.nominalDisplay}`} className='form-control' ref='nominalBebas' onChange={(text)=>this.formatDisplay(text.target.value)} onKeyPress={this.allowPositivesOnly}/> */}
                            <Switch 
                                onChange={this.handleChange}
                                inputProps={{ 'aria-label' : 'secondary checkbox' }}
                            />
                        <span className="text-gray">Klik Untuk Pilih Nominal </span>
                    </div>

                    <label>Pada tanggal berapa anda ingin diingatkan</label>
                    <input type='date' className='form-control' ref={(reminderDate) => this.reminderDate = reminderDate }/>

                    <div className='form-group'>
                        <div className='d-flex justify-content-center'>
                            <input type='button' onClick={this.renderMidtrans} className='btn btn-primary' value='Berlangganan Sekarang' />
                        </div>
                    </div>
      
                </form>

                {/* <h3>Scholarship List</h3>
                <div>
                    {this.renderScholarshipList()}
                </div> */}
            </div>
         );
    }
}

const mapStatetoProps = ({ auth, sub }) => {
    return{
        id: auth.id,
        nama: auth.nama,
        email: auth.email,
        subStatusFromDb: auth.subscriptionStatus,
        subNominalFromDb: auth.subscriptionNominal,
        subStatus: sub.subscriptionStatus,
        subNominal: sub.subscriptionNominal
    }
}
 
export default connect(mapStatetoProps, { applySub, getSub })(Subscription);
