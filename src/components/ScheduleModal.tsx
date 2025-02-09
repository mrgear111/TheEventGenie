'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar as CalendarIcon } from 'lucide-react'

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  busyDays: { [key: string]: string }
  onBlockDate: (date: string, reason: string) => Promise<void>
  onUnblockDate: (date: string) => Promise<void>
}

export default function ScheduleModal({
  isOpen,
  onClose,
  busyDays,
  onBlockDate,
  onUnblockDate
}: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    const dateString = date.toISOString().split('T')[0]
    if (busyDays[dateString]) {
      setReason(busyDays[dateString])
    } else {
      setReason('')
    }
  }

  const handleBlockDate = async () => {
    if (!selectedDate || !reason) return
    
    setLoading(true)
    try {
      const dateString = selectedDate.toISOString().split('T')[0]
      await onBlockDate(dateString, reason)
      setReason('')
    } catch (error) {
      console.error('Error blocking date:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUnblockDate = async () => {
    if (!selectedDate) return
    
    setLoading(true)
    try {
      const dateString = selectedDate.toISOString().split('T')[0]
      await onUnblockDate(dateString)
      setReason('')
    } catch (error) {
      console.error('Error unblocking date:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateCalendarDays = () => {
    const days = []
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0)

    for (let date = new Date(startDate); date <= endDate; date = new Date(date.setDate(date.getDate() + 1))) {
      const dateString = date.toISOString().split('T')[0]
      const isBlocked = busyDays[dateString]
      const isSelected = selectedDate && dateString === selectedDate.toISOString().split('T')[0]
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

      days.push(
        <button
          key={dateString}
          onClick={() => !isPast && handleDateClick(date)}
          disabled={isPast}
          className={`
            p-3 rounded-lg text-sm font-medium transition-all duration-200
            ${isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
            ${isBlocked ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'hover:bg-gray-100'}
            ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
          `}
        >
          {date.getDate()}
          {isBlocked && <div className="w-1 h-1 bg-red-500 rounded-full mx-auto mt-1" />}
        </button>
      )
    }
    return days
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Manage Schedule</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar */}
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {generateCalendarDays()}
              </div>

              {/* Block/Unblock Form */}
              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for blocking
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g., Booked for private event"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleBlockDate}
                    disabled={loading || !selectedDate || !reason}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    Block Date
                  </button>
                  <button
                    onClick={handleUnblockDate}
                    disabled={loading || !selectedDate || !busyDays[selectedDate.toISOString().split('T')[0]]}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    Unblock Date
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 