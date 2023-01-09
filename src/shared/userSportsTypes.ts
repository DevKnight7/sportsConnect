export interface UserSportPayload {
    role_id: number
    sport_id: number
}

export interface UserSportType {
    is_available: boolean
    name: string
    sport_id: number
}

export interface UserSportAvailability {
    is_available: boolean
}