'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import DashboardProfileInfo from '@/components/DashboardProfileInfo'
import bkashLogo from '@/public/images/bkash-logo.webp'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const TIME_SLOTS = [
  "05:00am to 06:30am",
  "06:30am to 08:00am",
  "08:00am to 09:30am",
  "09:30am to 11:00am",
  "11:00am to 12:30pm",
  "12:30pm to 02:00pm",
  "02:00pm to 03:30pm",
  "03:30pm to 05:00pm",
  "05:00pm to 06:30pm",
  "06:30pm to 08:00pm",
  "08:00pm to 09:30pm",
  "09:30pm to 11:00pm",
  "11:00pm to 12:30am",
  "12:30am to 02:00am"
];

const Booking = () => {
  const router = useRouter()
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    arenaName: '',
    bookingDate: '',
    timeSlot: '',
    notes: '',
    paymentType: '',
    transactionId: '',
    bookingForName: '',
    bookingForPhone: '',
    advanceAmount: 500
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [availableSlots, setAvailableSlots] = useState([])

  const arenaPricing = {
    'Sky Turf': 2500,
    'Time Up': 2000
  }

  const currentPrice = arenaPricing[formData.arenaName] || 0

  const role = session?.user?.role
  const isStaff = role !== "USER"  // Admin/Moderator booking for customer

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handlePaymentChange = (e) => {
    setFormData(prev => ({ ...prev, paymentType: e.target.value }))
    if (errors.paymentType) setErrors(prev => ({ ...prev, paymentType: '' }))
  }

  useEffect(() => {
    if (!formData.arenaName || !formData.bookingDate) return

    const fetchSlots = async () => {
      try {
        const res = await fetch(`/api/bookings/slots?arena=${formData.arenaName}&date=${formData.bookingDate}`)
        const data = await res.json()
        if (res.ok) setAvailableSlots(data.availableSlots || [])
      } catch (err) {
        console.error("Error fetching available slots:", err)
      }
    }

    fetchSlots()
  }, [formData.arenaName, formData.bookingDate])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.arenaName) newErrors.arenaName = 'Please select an arena'
    if (!formData.bookingDate) newErrors.bookingDate = 'Please select a date'
    else {
      const selectedDate = new Date(formData.bookingDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      selectedDate.setHours(0, 0, 0, 0)
      if (selectedDate < today) newErrors.bookingDate = 'Cannot book for past dates'
    }
    if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot'
    if (!formData.paymentType) newErrors.paymentType = 'Please select a payment option'
    if (!formData.transactionId) newErrors.transactionId = 'Please enter transaction ID'
    else if (formData.transactionId.length !== 10)
      newErrors.transactionId = 'Transaction ID must be exactly 10 characters'

    if (isStaff) {
      if (!formData.bookingForName) newErrors.bookingForName = "Customer name is required"
      if (!formData.bookingForPhone) newErrors.bookingForPhone = "Customer phone is required"
    }

    if (formData.paymentType === "advance" && formData.advanceAmount < 500)
      newErrors.advanceAmount = "Advance amount must be at least 500"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) return

    setLoading(true)

    try {
      const bookingData = {
        arenaName: formData.arenaName,
        bookingDate: formData.bookingDate,
        timeSlot: formData.timeSlot,
        notes: formData.notes,
        paymentType: formData.paymentType,
        transactionId: formData.transactionId,
        totalAmount: formData.paymentType === "advance" ? formData.advanceAmount : currentPrice,
        ...(isStaff && {
          bookingForName: formData.bookingForName,
          bookingForPhone: formData.bookingForPhone
        })
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create booking')

      setAvailableSlots(prev => prev.filter(slot => slot !== formData.timeSlot))
      toast.success('Booking confirmed successfully!', { duration: 3000 })
      router.push(`/dashboard`)
    } catch (error) {
      console.error('Booking error:', error)
      toast.error(error.message || 'Failed to create booking. Please try again.', { duration: 3000 })
    } finally {
      setLoading(false)
    }
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const isSubmitDisabled =
    loading ||
    !formData.arenaName ||
    !formData.bookingDate ||
    !formData.timeSlot ||
    !formData.paymentType ||
    formData.transactionId.length !== 10 ||
    (isStaff && (!formData.bookingForName || !formData.bookingForPhone)) ||
    (formData.paymentType === "advance" && formData.advanceAmount < 500)

  const getButtonTooltip = () => {
    if (loading) return 'Processing...'
    if (!formData.arenaName) return 'Please select an arena'
    if (!formData.bookingDate) return 'Please select a date'
    if (!formData.timeSlot) return 'Please select a time slot'
    if (!formData.paymentType) return 'Please select a payment option'
    if (formData.transactionId.length !== 10) return 'Transaction ID must be exactly 10 characters'
    if (isStaff && (!formData.bookingForName || !formData.bookingForPhone)) return 'Enter customer name & phone'
    if (formData.paymentType === "advance" && formData.advanceAmount < 500) return 'Advance must be at least 500'
    return 'Confirm your booking'
  }

  return (
    <section className='booking'>
      <div className="container">
        <div className="booking__content">
          {/* Form Section */}
          <div className="booking__info-wrap">
            <DashboardProfileInfo />

            <form className='booking__form-wrap' onSubmit={handleSubmit}>
              <h2 className='booking__form-heading'>Booking</h2>

              {/* Arena Select */}
              <div className='booking__form-input-wrap'>
                <label className='booking__form-label' htmlFor="arenaName">Arena:</label>
                <select
                  className='booking__select'
                  name="arenaName"
                  id="arenaName"
                  value={formData.arenaName}
                  onChange={handleChange}
                >
                  <option value="">Select Arena</option>
                  <option value="Sky Turf">Sky Turf</option>
                  <option value="Time Up">Time Up</option>
                </select>
                {errors.arenaName && <span className='error-message'>{errors.arenaName}</span>}
              </div>

              {/* Booking Date */}
              <div className='booking__form-input-wrap'>
                <label className='booking__form-label' htmlFor="bookingDate">Date:</label>
                <input
                  className='booking__form-input'
                  type="date"
                  name="bookingDate"
                  id="bookingDate"
                  min={getMinDate()}
                  value={formData.bookingDate}
                  onChange={handleChange}
                />
                {errors.bookingDate && <span className='error-message'>{errors.bookingDate}</span>}
              </div>

              {/* Time Slot */}
              <div className='booking__form-input-wrap'>
                <label className='booking__form-label' htmlFor="timeSlot">Time:</label>
                <select
                  className='booking__select'
                  name="timeSlot"
                  id="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                >
                  <option value="">Time Slots</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot} disabled={!availableSlots.includes(slot)}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.timeSlot && <span className='error-message'>{errors.timeSlot}</span>}
              </div>

             
              {isStaff && (
                <>
                  <div className='booking__form-input-wrap'>
                    <label className='booking__form-label'>Customer Name:</label>
                    <input
                      type="text"
                      name="bookingForName"
                      className='booking__form-input'
                      value={formData.bookingForName}
                      onChange={handleChange}
                    />
                    {errors.bookingForName && <span className='error-message'>{errors.bookingForName}</span>}
                  </div>
                  <div className='booking__form-input-wrap'>
                    <label className='booking__form-label'>Customer Phone:</label>
                    <input
                      type="text"
                      name="bookingForPhone"
                      className='booking__form-input'
                      value={formData.bookingForPhone}
                      onChange={handleChange}
                    />
                    {errors.bookingForPhone && <span className='error-message'>{errors.bookingForPhone}</span>}
                  </div>
                </>
              )}

              {/* Transaction ID */}
              <div className='booking__form-input-wrap'>
                <p className='booking__form-label'>Our Bkash Merchent Number: 01887876580</p>
                <p className='booking__form-label'>Make your advance payment first and share your transaction ID</p>
              </div>
              <div className='booking__form-input-wrap'>
                <label className='booking__form-label' htmlFor="transactionId">Transaction ID:</label>
                <input
                  type="text"
                  name="transactionId"
                  id="transactionId"
                  maxLength={10}
                  value={formData.transactionId}
                  onChange={handleChange}
                  className='booking__form-input'
                  placeholder="Enter 10-character transaction ID 'CLXXXXXXXX'"
                />
                {errors.transactionId && <span className='error-message'>{errors.transactionId}</span>}
                {formData.transactionId && formData.transactionId.length !== 10 && (
                  <span className='error-message'>
                    {formData.transactionId.length}/10 characters entered
                  </span>
                )}
              </div>

              {/* Advance Amount */}
              {formData.paymentType === "advance" && (
                <div className='booking__form-input-wrap'>
                  <label className='booking__form-label'>Advance Amount (min 500):</label>
                  <input
                    type="number"
                    min={500}
                    className='booking__form-input'
                    value={formData.advanceAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, advanceAmount: Number(e.target.value) }))}
                  />
                  {errors.advanceAmount && <span className='error-message'>{errors.advanceAmount}</span>}
                </div>
              )}

              {/* Notes */}
              <div className='booking__form-input-wrap'>
                <label className='booking__form-label' htmlFor="notes">Notes:</label>
                <textarea
                  className='booking__form-input'
                  rows="3"
                  name="notes"
                  id="notes"
                  placeholder='Specify number of players or any specific requirements'
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              {/* Payment Options */}
              <div className='booking__payment-wrap'>
                <h2 className='booking__payment-heading'>Payment</h2>
                <p className='booking__payment-amount'>BDT {currentPrice.toLocaleString()}</p>

                <div className='booking__payment-option-wrap'>
                  <div className='booking__payment-option'>
                    <div className='booking__payment-radio'>
                      <input
                        className='booking__payment-input'
                        id="fullpay"
                        name='payment'
                        type="radio"
                        value="full"
                        checked={formData.paymentType === 'full'}
                        onChange={handlePaymentChange}
                      />
                      <label className='booking__payment-label' htmlFor="fullpay">
                        Full Pay with bKash
                      </label>
                    </div>
                    <div className='booking__payment-option-logo-wrap'>
                      <Image className='booking__payment-option-logo' src={bkashLogo} alt="bkash Logo" />
                    </div>
                  </div>

                  <div className='booking__payment-divider-wrap'>
                    <hr /><p className='booking__payment-divider'>or</p><hr />
                  </div>

                  <div className='booking__payment-option'>
                    <div>
                      <input
                        className='booking__payment-input'
                        id="advancepay"
                        name='payment'
                        type="radio"
                        value="advance"
                        checked={formData.paymentType === 'advance'}
                        onChange={handlePaymentChange}
                      />
                      <label className='booking__payment-label' htmlFor="advancepay">
                        Pay Advance with bKash
                      </label>
                    </div>
                    <div className='booking__payment-option-logo-wrap'>
                      <Image className='booking__payment-option-logo' src={bkashLogo} alt="bkash Logo" />
                    </div>
                  </div>

                  {errors.paymentType && <span className='error-message'>{errors.paymentType}</span>}

                  <p className='booking__payment-agree-text'>By making this booking you agree to our terms and conditions.</p>

                  <div className='booking__payment-button-wrap'>
                    <button
                      type="submit"
                      className='tertiary-button booking__payment-button'
                      disabled={isSubmitDisabled}
                      title={getButtonTooltip()}
                    >
                      {loading ? 'PROCESSING...' : 'CONFIRM BOOKING'}
                    </button>
                  </div>

                  <p className='booking__payment-agree-text'>I agree that confirming the booking places me under an obligation to make a payment in accordance with the General Terms and Conditions.</p>

                  {submitError && <div className='error-message' style={{ marginBottom: '1rem' }}>{submitError}</div>}
                </div>
              </div>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="booking__summary-wrap">
            <div className='booking__summary-sticky'>
              <h3 className='booking__summary-heading'>Booking Summary</h3>
              <div className='booking__summary-info-wrap'>
                <h4 className='booking__summary-user-name'>{session?.user?.name}</h4>
                <p className='booking__summary-user-contact'>{session?.user?.phone}</p>
              </div>
              <div className='booking__summary-slot-info'>
                <p className='booking__summary-arena'>{formData.arenaName || 'Arena Name'}</p>
                <p className='booking__summary-slot'>
                  {formData.bookingDate ? new Date(formData.bookingDate).toDateString() : 'Date'} {formData.timeSlot}
                </p>
                <p className='booking__summary-duration'>Duration: 90 mins</p>
              </div>
              <div className='booking__summary-amount-wrap'>
                <p className='booking__summary-amount-text'>Payable</p>
                <p className='booking__summary-amount'>BDT {formData.paymentType === "advance" ? formData.advanceAmount.toLocaleString() : currentPrice.toLocaleString()}</p>
              </div>
              <div className='booking__summary-help-wrap'>
                <p className='booking__summary-help-title'>Need help?</p>
                <p className='booking__summary-help-text'>Contact our team of experts for further assistance.</p>
                <p className='booking__summary-phone-text'>Phone:
                  <Link href='tel:01887876580'>
                    <span className='booking__summary-phone'> +8801887876580</span>
                  </Link>
                </p>
                <p className='booking__summary-phone-text'>Email:
                  <Link href='mailto:skyturf0@gmail.com'>
                    <span className='booking__summary-email'> skyturf0@gmail.com</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Booking
