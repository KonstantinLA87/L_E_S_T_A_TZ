export const getAllShips = `query getAllShips {
    vehicles {
        name
        description
        icons {
            large
            medium
        }
        level
        type {
            name
        }
        nation {
            name
            icons {
                large
            }
        }
    }
}`;