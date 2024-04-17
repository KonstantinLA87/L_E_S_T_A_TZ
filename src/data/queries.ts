export const getAllShips = `query getAllShips {
    vehicles {
        title
        name
        description
        icons {
            large
            medium
        }
        level
        type {
            name
            title
            icons {
                default
            }
        }
        nation {
            name
            title
            color
            icons {
                small
                medium
                large
            }
        }
    }
}`;