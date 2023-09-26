import {colors} from './colors';

export const style = {
  alignCenter: {alignItems: 'center'},
  rowBetweenCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowButton: {
    backgroundColor: colors.gold,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  yellowRoundCorner: {
    backgroundColor: colors.gold,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
};
