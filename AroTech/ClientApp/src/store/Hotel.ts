import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface HotelState {
    isLoading: boolean;
    startDateIndex?: number;
    hotelList?: Hotel[];
}

export interface HotelDetailState {
    isLoading: boolean;
    Id?: string;
    hotelDetail?: Hotel;
}


export interface Hotel {
    Id: string;
    Name: string;
    Price: number;
    Description: string;
    Images: Image[];
    Features: Feature[];
    RoomCategorey: Feature[];
    Address: Address;
}
export interface Image {
    Url: string;
}
export interface Feature {
    Name: string;
}
export interface Address {
    StreetName1: string;
    StreetName2: string;
    StreetName3: string;
    City: string;
    State: string;
    Country: string;
    ZipCode: string;
}



// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestHotelListAction {
    type: 'REQUEST_HOTEL_LIST';
    startDateIndex: number;
}

interface ReceiveHotelListAction {
    type: 'RECEIVE_HOTEL_LIST';
    startDateIndex: number;
    hotelList: Hotel[];
}


interface RequestHotelDetailAction {
    type: 'REQUEST_HOTEL_DETAIL';
    id: string;
}

interface ReceiveHotelDetailtAction {
    type: 'RECEIVE_HOTEL_DETAIL';
    id: string;
    hotel: Hotel;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestHotelListAction | ReceiveHotelListAction | RequestHotelDetailAction | ReceiveHotelDetailtAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestHotelList: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();

        if (appState && appState.hotel && startDateIndex !== appState.hotel.startDateIndex) {

            fetch(`api/hotels`)
                .then(response => response.json() as Promise<Hotel[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_HOTEL_LIST', startDateIndex: startDateIndex, hotelList: data });
                });

            dispatch({ type: 'REQUEST_HOTEL_LIST', startDateIndex: startDateIndex });
        }
    }   
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: HotelState = { hotelList: [], isLoading: false };

export const reducer: Reducer<HotelState> = (state: HotelState | undefined, incomingAction: Action): HotelState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_HOTEL_LIST':
            return {
                startDateIndex: action.startDateIndex,
                hotelList: state.hotelList,
                isLoading: true
            };
        case 'RECEIVE_HOTEL_LIST':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    hotelList: action.hotelList,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
