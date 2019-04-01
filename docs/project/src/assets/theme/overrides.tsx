import { Overrides } from '@material-ui/core/styles/overrides';

const overrides: Overrides = {
  MuiTablePagination: {
    input: {
      padding: 0,
      marginLeft: 7,
      marginRight: 32
    },
    selectRoot: {
      marginLeft: 0,
      marginRight: 0
    },
    select: {
      paddingRight: 20
    }
  },
  MuiExpansionPanel: {
    expanded: {
      marginTop: 0,
      marginBottom: 0
    }
  },
  MuiExpansionPanelDetails: {
    root: {
      display: 'block'
    }
  }
};

export default overrides;