import React, { useState } from 'react';
import axios from 'axios';
import Header from '../common/header';
import Footer from '../common/footer';
import {
    formatDateTime,
} from "../../lib/utils";
import { BookingData } from '../../types/booking';
const OrderTracking: React.FC = () => {
    const [bookingCode, setBookingCode] = useState('');
    const [order, setOrder] = useState<BookingData|undefined>();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [status, setStatus] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBookingCode(event.target.value);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };

    const trackOrder = async () => {
        if (!bookingCode) {
            setError('Please enter a booking code.');
            return;
        }

        try {
            setError('');
            setLoading(true); // Start loading
            const response = await axios.get(`/booking/TrackOrder/${bookingCode}`);
            setOrder(response.data);
        } catch (err) {
            setError('Order not found or there was an error fetching the order.');
        } finally {
            setLoading(false); // End loading
        }
    };

    enum BookingStatus {
        Pending = "Pending",
        InProcess = "In Process",
        Completed = "Completed",
    }


    const renderStatusLabel = (status: number) => {
        // Map the numeric status (e.g., 0) to its string equivalent using the enum
        switch (status) {
            case 0:
                return <span className="status-pending">{BookingStatus.Pending}</span>;
            case 1:
                return <span className="status-inprocess">{BookingStatus.InProcess}</span>;
            case 2:
                return <span className="status-completed">{BookingStatus.Completed}</span>;
            default:
                return <span>{status}</span>;  // Default case if status doesn't match
        }
    };

    const renderOrderTrackingProgress = () => {
        const steps = [
            { status: 'Pending', date: formatDateTime(order!.createDate!.toString()), isCompleted: order!.bookingStatus! >= 0 },
            { status: 'In Process', date : formatDateTime(order!.updateDate!.toString()), isCompleted: order!.bookingStatus! >= 1 },
            { status: 'Completed', date: formatDateTime(order!.updateDate!.toString()), isCompleted: order!.bookingStatus! >= 2 },

        ];

        return steps.map((step, index) => (
            <div key={index} className={`order-tracking ${step.isCompleted ? 'completed' : ''}`}>
                <span className={`is-complete ${step.isCompleted ? 'active' : ''}`}></span>
                <p>{step.status}<br /><span>{step.isCompleted ? step.date : 'N/A'}</span></p>

            </div>
        ));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Header />
                <div className='custom-container'>
                    <div className="card mb-3 p-4">
                        <div className="flex items-center max-w-sm mx-auto">
                            <label className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter booking code"
                                    value={bookingCode}
                                    onChange={handleChange} required />
                            </div>
                            <button onClick={trackOrder} disabled={loading} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">                        {loading ? 'Tracking...' : 'Track Order'}
                                </span>
                            </button>
                        </div>

                        {error && <div style={{ color: 'red' }}>{error}</div>}

                        {order && (
                            <div>
                                {/* Order Tracking Steps */}
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
                                        <div className="row justify-content-between">
                                            {renderOrderTrackingProgress()}
                                        </div>

                                        <div className="p-2 text-center text-white text-lg bg-track rounded-top mt-3">
                                    <span className="text-medium">Booking Info</span>
                                </div>
                                <div className='custom-card p-2'>
                                    <p><strong>Booking Code: </strong> {order.bookingCode}</p>
                                    <p><strong>Customer Name: </strong> {order.customerName}</p>
                                    <p><strong>Service Name: </strong> {order.serviceName} {order.duration}</p>
                                    <p><strong>Status: </strong> {renderStatusLabel(order.bookingStatus!)}</p>
                                    <p><strong>Requested Date: </strong>{formatDateTime(order.createDate!.toString())}
                                    </p>
                                </div>
                                    </div>
                                </div>
                       
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderTracking;