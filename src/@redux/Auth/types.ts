const entity = 'AUTH'

const TypesActions = {
    GET_START: `${entity}_GET_START`,
    GET_COMPLETE: `${entity}_GET_COMPLETE`,
    GET_ERROR: `${entity}_GET_ERROR`,
    GET_LOGIN_USER: `${entity}_GET_LOGIN_USER`,
    GET_LOGOUT_USER: `${entity}_GET_LOGOUT_USER`,
    SET_CURRENT_USER_STORE: `${entity}_SET_CURRENT_USER_STORE`,
    GET_VALIDATE_TOKEN: `${entity}_GET_VALIDATE_TOKEN`
}

interface StateProps {
    currentUser: AuthUserProps;
    isLoading: boolean;
    error: {
        visible: boolean;
        message: string;
    }
}

interface PermissionProps {
    entity: string;
    profile: string;
    products: { 
        code: string; 
        actions: any; 
    }[];
}

interface AuthUserProps {
    success: boolean;
    data: {
        userId: string;
        firstName: string;
        lastName: string;
        office: string | null;
        permissions: PermissionProps[];
    };
}

export {
    TypesActions,
    StateProps,
    AuthUserProps,
    PermissionProps
}