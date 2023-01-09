export interface Sport {
    id: number; name: string; lower_bound: number; upper_bound: number
}

export interface NewSportPayload {
     name: string; lower_bound: number; upper_bound: number
}

export interface CreateSportResponse{
    id: number
    message: number
    name: number
}

export interface SportRoles {
    id: number; name: string
}

export interface SportAttributes {
    id: number
    name: string
}

export interface MatchTeams {
    team1: {
        email: string
        id: number
        name: string
        profile_pic: string
        username: string
    }[]
    team2: {
        email: string
        id: number
        name: string
        profile_pic: string
        username: string
    }[]

}
