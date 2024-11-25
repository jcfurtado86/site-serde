import { ChangeEvent, useState } from 'react'

interface SearchProps {
  onSearch: (value: string) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  initialValue?: string
  debounceTime?: number
  minLength?: number
}

export function Search({
  onSearch,
  placeholder = "Pesquisar...",
  className = "",
  inputClassName = "",
  initialValue = "",
  debounceTime = 300,
  minLength = 0
}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    
    if (value.length >= minLength) {
      const timeoutId = setTimeout(() => {
        onSearch(value)
      }, debounceTime)
      
      return () => clearTimeout(timeoutId)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${inputClassName}`}
      />
    </div>
  )
}