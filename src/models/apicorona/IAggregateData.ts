interface IAggregateData {
    deaths: number | null,
    confirmed: number | null,
    recovered: number | null,
    critical: number | null,
    calculated: {
        death_rate: number | null,
        recovery_rate: number | null,
        recovered_vs_death_ratio: number | null,
        cases_per_million_population: number | null
    }
}

export default IAggregateData;