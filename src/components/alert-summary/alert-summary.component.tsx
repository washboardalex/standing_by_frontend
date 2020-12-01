import React from 'react';
import {Button, NativeSyntheticEvent, NativeTouchEvent, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { deleteAlert } from '../../redux/alerts/alerts.actions';
import { selectFirebaseTokenId } from '../../redux/firebase/firebase.selectors';
import { AppState } from '../../redux/root-reducer';
import { fArgReturn } from '../../utils/types';
import { IAlert, IAlert as IReceivedProps } from '../../models/admin/IAlert';
import {genTypeText, genConditionText} from './alert-summary.utils';

interface IReduxStateProps {
    fcmTokenAdminId: number | null
}

interface IDispatchProps {
    deleteAlert: fArgReturn
}

type AlertSummaryProps = IReceivedProps & IDispatchProps & IReduxStateProps;

const AlertSummary : React.FC<AlertSummaryProps> = ({ country, type, condition, value, deleteAlert, id, fcmTokenAdminId }) => (
    <View>
        <Text>
            {`You will be alerted when ${genTypeText(type)} are ${genConditionText(condition)} ${value} in ${country}.`}
        </Text>
        <Button title='Delete' onPress={(e : NativeSyntheticEvent<NativeTouchEvent>) => deleteAlert(id, fcmTokenAdminId)}>Delete</Button>
    </View>
);

const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    fcmTokenAdminId: selectFirebaseTokenId
});

const mapDispatchToProps =  (dispatch: Dispatch<AnyAction>) => ({
    deleteAlert: (alertId : number, fcmTokAdminId : number) => dispatch<any>(deleteAlert(alertId, fcmTokAdminId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertSummary);

