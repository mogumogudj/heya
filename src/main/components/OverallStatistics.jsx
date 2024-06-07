import React, { useEffect, useState } from 'react';
import '../../shared/css/app.css';
import '../../main/css/rooms.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function OverallStatistics () {
    const [active, setActive] = useState('year');
    
    const yearlyActive = () => {
        setActive('year');
    }

    const monthlyActive = () => {
        setActive('month');
    }

    const weeklyActive = () => {
        setActive('week');
    }
    
    return (
        <div className='overall-statistics'>
            <div className='overall-statistics--head'>
                <div className='overall-statistics__filters'>
                    <button
                        onClick={yearlyActive}
                        className={active === 'year' ? 'blue__button overall-statistics__filter active' : 'white__button overall-statistics__filter'}
                    >
                        Yearly
                    </button>
                    <button 
                        onClick={monthlyActive} 
                        className={active === 'month' ? 'blue__button overall-statistics__filter active' : 'white__button overall-statistics__filter'}
                    >
                        Monthly
                    </button>
                    <button 
                        onClick={weeklyActive} 
                        className={active === 'week' ? 'blue__button overall-statistics__filter active' : 'white__button overall-statistics__filter'}
                    >
                        Weekly
                    </button>
                </div>
                <SearchRoundedIcon className='overall-statistics__search' sx={{ fontSize: 28 }} />
            </div>
            <div className='overall-statistics--content'>
                <div className='overall-statistics--current stats__card'>
                    <h6 className='overall-statistics--current__title no__padding'>Current Income</h6>
                    <h6 className='overall-statistics--current__value no__padding'>€45.678,90</h6>
                    <p className='overall-statistics--current__grow no__padding'>+20% over last {active}</p>
                </div>
                <div className='overall-statistics--yearly stats__card'>
                    <h6 className='overall-statistics--yearly__title no__padding'>{active}ly Income</h6>
                    <h6 className='overall-statistics--yearly__value no__padding'>2.405</h6>
                    <p className='overall-statistics--yearly__grow no__padding'>+33% over last {active}</p>
                </div>
                <div className='overall-statistics--users stats__card'>
                    <h6 className='overall-statistics--users__title no__padding'>{active}ly Active Users</h6>
                    <h6 className='overall-statistics--users__value no__padding'>10.353</h6>
                    <p className='overall-statistics--users__grow no__padding'>-8% over last {active}</p>
                </div>
            </div>
        </div>
    );
}

export default OverallStatistics;