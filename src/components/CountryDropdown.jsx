import FilterDropdown from './FilterDropdown'

// Compartilhado entre o mapa, a carta e a página de restaurantes.
export default function CountryDropdown({ options, value, onChange }) {
  return (
    <FilterDropdown
      options={options}
      value={value}
      onChange={onChange}
      allLabel="Todos os países"
      ariaLabel="Filtrar por país"
      searchable
      showFlags
      showCounts
    />
  )
}
