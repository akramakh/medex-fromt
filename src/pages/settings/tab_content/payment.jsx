import React from 'react';

export default function Payment() {
    return (
        <div className="card">
            <div className="card-body">
            
                <form action="booking-success.html">
                
                    <div className="info-widget">
                        <h4 className="card-title">Personal Information</h4>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                    <label>First Name</label>
                                    <input className="form-control" type="text" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                    <label>Last Name</label>
                                    <input className="form-control" type="text" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                    <label>Email</label>
                                    <input className="form-control" type="email" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                    <label>Phone</label>
                                    <input className="form-control" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="payment-widget">
                        <h4 className="card-title">Payment Method</h4>
                        
                        <div className="payment-list">
                            <label className="payment-radio credit-card-option">
                                <input type="radio" name="radio" checked />
                                <span className="checkmark"></span>
                                Credit card
                            </label>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group card-label">
                                        <label for="card_name">Name on Card</label>
                                        <input className="form-control" id="card_name" type="text" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group card-label">
                                        <label for="card_number">Card Number</label>
                                        <input className="form-control" id="card_number" placeholder="1234  5678  9876  5432" type="text" maxLength={16} minLength={16} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group card-label">
                                        <label for="expiry_month">Expiry Month</label>
                                        <input className="form-control" id="expiry_month" placeholder="MM" type="text" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group card-label">
                                        <label for="expiry_year">Expiry Year</label>
                                        <input className="form-control" id="expiry_year" placeholder="YY" type="text" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group card-label">
                                        <label for="cvv">CVV</label>
                                        <input className="form-control" id="cvv" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="payment-list">
                            <label className="payment-radio paypal-option">
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                                Paypal
                            </label>
                        </div>
                        
                        <div className="terms-accept">
                            <div className="custom-checkbox">
                                <input type="checkbox" id="terms_accept" />
                                <label for="terms_accept">I have read and accept <a href="#">Terms &amp; Conditions</a></label>
                            </div>
                        </div>
                        
                        <div className="submit-section mt-4">
                            <button type="submit" className="btn btn-primary submit-btn">Add Payment Method</button>
                        </div>
                        
                    </div>
                </form>
                
            </div>
        </div>
    )
}
