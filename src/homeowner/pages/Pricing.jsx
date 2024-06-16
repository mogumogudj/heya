import React, { useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import Footer from '../../shared/components/Footer.jsx';
import NavLogin from '../../shared/components/NavLogin.jsx';

function Pricing() {
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation hook to get location

    const [rent, setRent] = useState('');
    const [additionalCosts, setAdditionalCosts] = useState('');
    const [serviceCost, setServiceCost] = useState('');
    const [deposit, setDeposit] = useState('');
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roomIdFromParams = params.get('roomId');
        if (roomIdFromParams) {
            setRoomId(roomIdFromParams);
        }
    }, [location]);

    useEffect(() => {
        if (rent !== '') {
            const calculatedServiceCost = (parseFloat(rent) * 0.05).toFixed(2);
            setServiceCost(calculatedServiceCost);
        }
    }, [rent]);

    const handleInputChange = (setFunction) => (event) => {
        setFunction(event.target.value);
    };

    const calculateTotal = () => {
        const rentValue = parseFloat(rent) || 0;
        const additionalCostsValue = parseFloat(additionalCosts) || 0;
        const serviceCostValue = parseFloat(serviceCost) || 0;
        const depositValue = parseFloat(deposit) || 0;

        let totalAmount = rentValue + additionalCostsValue - serviceCostValue + depositValue;
        const depositFee = totalAmount * 0.02;
        totalAmount -= depositFee;

        return totalAmount.toFixed(2);
    };

    const handleNextStep = async () => {
        const pricingDetails = {
            rent: parseFloat(rent) || 0,
            additionalCosts: parseFloat(additionalCosts) || 0,
            serviceCost: parseFloat(serviceCost) || 0,
            deposit: parseFloat(deposit) || 0,
        };

        const roomUpdateDto = {
            pricing: pricingDetails,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomUpdateDto),
            });

            if (response.ok) {
                navigate(`/ideal-attendant-homeowner?roomId=${roomId}`);
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to update pricing details');
            }
        } catch (error) {
            console.error(error.message || 'Failed to update pricing details');
        }
    };

    return (
        <div className="page__container">
            <NavLogin />
            <div className="content" style={{ minHeight: '112vh' }}>
                <div className="center-container" style={{ height: '100%' }}>
                    <div className="pricing__page">
                        <div className="homeowner__register__header">
                            <h1>Set Your Room Pricing</h1>
                            <h2>Enter the details below</h2>
                        </div>

                        <div className="pricing__sections">
                            <div className="pricing__inputs">
                                <div className="form__group">
                                    <p>Rent (/ month)</p>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            maxLength="6"
                                            placeholder="1000"
                                            className={'input__field'}
                                            value={rent}
                                            onChange={handleInputChange(setRent)}
                                            style={{ paddingRight: '30px', color: 'green' }}
                                        />
                                        <span
                                            className="input-unit"
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >
                                            €
                                        </span>
                                    </div>
                                </div>

                                <div className="form__group">
                                    <p>Additional costs (/ month)</p>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            maxLength="6"
                                            placeholder="100"
                                            className={'input__field'}
                                            value={additionalCosts}
                                            onChange={handleInputChange(setAdditionalCosts)}
                                            style={{ paddingRight: '30px', color: 'green' }}
                                        />
                                        <span
                                            className="input-unit"
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >
                                            €
                                        </span>
                                    </div>
                                </div>

                                <div className="form__group">
                                    <p>
                                        Service cost <InfoOutlinedIcon />
                                    </p>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            maxLength="6"
                                            placeholder="50"
                                            className={'input__field'}
                                            value={serviceCost}
                                            onChange={handleInputChange(setServiceCost)}
                                            style={{ paddingRight: '30px', color: 'red' }}
                                        />
                                        <span
                                            className="input-unit"
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >
                                            €
                                        </span>
                                    </div>
                                </div>

                                <div className="form__group">
                                    <p>
                                        Deposit/Warranty <InfoOutlinedIcon />
                                    </p>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            maxLength="6"
                                            placeholder="500"
                                            className={'input__field'}
                                            value={deposit}
                                            onChange={handleInputChange(setDeposit)}
                                            style={{ paddingRight: '30px' }}
                                        />
                                        <span
                                            className="input-unit"
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >
                                            €
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pricing__summary">
                                <div className="summary__header">
                                    <button className="white__button small">Help</button>
                                </div>
                                <h2 className="bold">Total Amount</h2>
                                <h4>Of your Room</h4>
                                <div className="total__amount">
                                    <h4 className="total__price bold">€{calculateTotal()}</h4>
                                </div>
                                <hr />
                                <p>This can be changed later</p>
                            </div>
                        </div>

                        <div className="next__help">
                            <button className="blue__button medium" type="button" onClick={handleNextStep}>
                                Next step
                            </button>
                            <span className="help">I need help</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Pricing;
