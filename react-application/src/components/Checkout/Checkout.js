import React, { Component } from 'react';

class Checkout extends Component {
  constructor(props) {
    super(props);
    const copagos = [
      {
        date: '13/06/2018',
        title: 'Copago Pendiente',
        content: 'Su estudio de imágenes por rayos en el Centro Médico Salvador está pendiente de pago.',
      },
      {
        date: '11/04/2018',
        title: 'Cuota Junio',
        content: 'Su cuota del mes de Junio está pendiente. <br /> Monto: $300',
      },
      {
        date: '13/06/2018',
        title: 'Copago Pendiente',
        content: 'Su estudio de imágenes por rayos en el <b>Centro Médico Salvador</b> está pendiente de pago.',
      },
    ];
    this.state = {
      copagos,
      results: props.results,
    };
  }

  componentDidMount() {
    fetch('http://ags-tweet.herokuapp.com/ags/fortnite/timed_count')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            results: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  render() {
    return (
      <div id="content" className="page index checkout payment">
        <div className="page-title">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h2>Finalizá tu Pago</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-sm-12">
                      <p><b>Ingresá los datos de tu tarjeta:</b></p>
                    </div>
                  </div>
                  <form action method="post" id="pay" name="pay">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        {/* HIDDEN VALUES */}
                        <input type="hidden" id="docType" data-checkout="docType" defaultValue="DNI" />
                        <input type="hidden" id="email" name="email" defaultValue="test_user_19653727@testuser.com" placeholder="your email" />
                        <input type="hidden" id="amount" defaultValue="<%= params[:amount] %>" />
                        <div className="form-group">
                          <label htmlFor="cardNumber">Número de Tarjeta</label>
                          <div className="input-group">
                            <input type="text" id="cardNumber" className="form-control" data-checkout="cardNumber" placeholder="Ingrese aquí su número de tarjeta" required autoFocus />
                            <span className="input-group-addon"><i className="fa fa-lock" /></span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-7 col-md-7">
                            <div className="form-group">
                              <label htmlFor="expiry">Fecha de vencimiento</label>
                              <input placeholder="MM/AA" className="form-control" type="tel" name="expiry" id="expiry" required />
                            </div>
                          </div>
                          <div className="col-xs-5 col-md-5 pull-right">
                            <div className="form-group">
                              <label htmlFor="securityCode">Código de Seguridad</label>
                              <input type="text" className="form-control" id="securityCode" data-checkout="securityCode" placeholder="***" required />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-7">
                            <div className="form-group">
                              <label htmlFor="cardholderName">Nombre y Apellido</label>
                              <input type="text" id="cardholderName" className="form-control" data-checkout="cardholderName" placeholder="Ingrese nombre impreso en la tarjeta" required />
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="form-group">
                              <label htmlFor="cardholderName">DNI</label>
                              <input type="text" id="docNumber" className="form-control" data-checkout="docNumber" placeholder={31987909} required />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-7">
                        <div className="card-wrapper" />
                      </div>
                      <div className="col-md-5">
                        <div className="row">
                          <div className="col-md-12">
                            <h3 className="choose-plan">Elegí Tu Plan de Cuotas</h3>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 installments-list">
                            <ul id="installment-list" className="list-unstyled" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <input type="submit" className="btn btn-success btn-lg btn-block" defaultValue="Completar Pago" />
                  </form>
                </div>
                <div className="col-md-5">
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Checkout.defaultProps = {
  results: {
    data: 1,
  },
};

export default Checkout;
