import { Button, createTheme, ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


const theme= createTheme({
    palette:{
      primary:{
        main:'#0098db'
      }
    }
  })

const Payment = () => {


  return (
 <>
 <ThemeProvider theme={theme}>
 <Box>
    <a href='https://dashboard.paystack.com/#/dashboard?period=30' target="_blank" style={{textDecoration:'none'}}>
<Button>Click to view payment dashboard</Button>

    </a>
 </Box>
 </ThemeProvider>
 </>
  )
}

export default Payment