import { chakra, HTMLChakraProps } from '@chakra-ui/react'

export const Logo = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg
    width="62"
    height="75"
    viewBox="0 0 62 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M56.3649 28.3352L56.5161 28.1544C65.7247 17.3533 57.9526 0.526517 43.739 0.842867C42.983 0.857931 42.2118 0.903127 41.4407 0.963384C40.6695 1.02364 39.9135 1.11402 39.1574 1.21947C31.5063 2.28904 26.5769 8.05865 25.3824 14.5664C11.0025 17.0219 0.0550251 29.465 0.0550251 44.4841C0.0550251 61.2657 13.7091 74.8687 30.5537 74.8687C47.3983 74.8687 61.0524 61.2657 61.0524 44.4841C61.0524 38.5337 59.3135 33.0051 56.3498 28.3201L56.3649 28.3352ZM42.7411 10.2731C45.0092 10.2731 46.8388 12.0959 46.8388 14.3555C46.8388 16.6152 45.0092 18.4379 42.7411 18.4379C40.473 18.4379 38.6433 16.6152 38.6433 14.3555C38.6433 12.0959 40.473 10.2731 42.7411 10.2731ZM40.5486 47.512C40.3671 50.3742 39.8379 53.1159 39.0214 55.6618C38.9306 55.9329 38.6887 56.0986 38.4014 56.0986H22.7211C22.4338 56.0986 22.1919 55.9179 22.1012 55.6618C21.2846 53.1159 20.7705 50.3742 20.574 47.512C20.5437 47.1504 20.8461 46.8341 21.2242 46.8341H39.8984C40.2613 46.8341 40.5637 47.1504 40.5486 47.512ZM23.7796 30.5797C23.9913 30.1429 24.2181 29.706 24.4449 29.2842C24.6566 28.9076 25.1556 28.8323 25.4731 29.1336L26.7433 30.399C27.1515 30.8057 26.8642 31.4987 26.2896 31.4987H24.3693C23.9005 31.4987 23.583 31.0015 23.7947 30.5797H23.7796ZM30.6142 34.5266C30.7805 34.5266 30.9468 34.5868 31.0678 34.7074L39.097 42.7065C39.5052 43.1132 39.2179 43.8062 38.6433 43.8062H21.2242C20.8613 43.8062 20.5588 43.5049 20.574 43.1283C20.7403 40.2661 21.2393 37.5244 22.0407 34.9785C22.1314 34.7074 22.3733 34.5266 22.6606 34.5266H30.6142ZM11.4108 30.4743C13.573 27.7025 16.325 25.4127 19.4853 23.7858C19.7272 23.6652 20.0296 23.7104 20.2262 23.9063L22.328 26.0002C22.5397 26.2111 22.5699 26.5275 22.4187 26.7836C21.6022 28.1393 20.8613 29.5855 20.2262 31.0919C20.1203 31.333 19.8935 31.4836 19.6365 31.4836H11.9097C11.3805 31.4836 11.063 30.881 11.3956 30.4592L11.4108 30.4743ZM8.70413 34.8881C8.80997 34.6622 9.03678 34.5266 9.29384 34.5266H18.1698C18.5931 34.5266 18.8956 34.9333 18.7897 35.3401C18.1093 37.8257 17.6859 40.4619 17.5498 43.1885C17.5347 43.535 17.2474 43.8062 16.9147 43.8062H7.13156C6.75354 43.8062 6.45113 43.4898 6.49649 43.1132C6.75354 40.1908 7.52471 37.4189 8.71925 34.8881H8.70413ZM8.80997 55.7371C7.57007 53.2063 6.76867 50.4345 6.49649 47.512C6.46625 47.1354 6.76867 46.819 7.13156 46.819H16.8996C17.2474 46.819 17.5196 47.0902 17.5347 47.4216C17.6859 50.1482 18.1395 52.7845 18.8351 55.2852C18.956 55.6919 18.6385 56.0986 18.2151 56.0986H9.36945C9.12751 56.0986 8.9007 55.963 8.79485 55.7371H8.80997ZM24.5507 68.5417C19.3492 67.2161 14.8432 64.2183 11.6073 60.1509C11.2747 59.7291 11.5771 59.1115 12.1214 59.1115H19.7574C20.0145 59.1115 20.2413 59.2621 20.3472 59.5031C21.6173 62.4859 23.2503 65.1824 25.2009 67.4872C25.6092 67.9693 25.1707 68.6773 24.5659 68.5267L24.5507 68.5417ZM30.9922 68.2555C30.7503 68.4664 30.4025 68.4664 30.1606 68.2555C27.6505 66.1164 25.5185 63.3144 23.9005 60.0605C23.6888 59.6387 23.9913 59.1265 24.4751 59.1265H36.6776C37.1615 59.1265 37.4639 59.6237 37.2522 60.0605C35.6343 63.3144 33.5023 66.1164 30.9922 68.2555ZM49.5454 60.166C46.3096 64.2333 41.7885 67.2311 36.602 68.5568C35.9972 68.7074 35.5587 67.9994 35.967 67.5173C37.9175 65.2125 39.5657 62.516 40.8207 59.5333C40.9266 59.2923 41.1534 59.1416 41.4104 59.1416H49.0465C49.5757 59.1416 49.8932 59.7592 49.5606 60.181L49.5454 60.166ZM52.3277 55.7521C52.2218 55.9781 51.995 56.1137 51.7531 56.1137H42.9074C42.484 56.1137 42.1665 55.707 42.2874 55.3002C42.983 52.8146 43.4366 50.1784 43.5878 47.4367C43.603 47.0902 43.8903 46.8341 44.2229 46.8341H53.991C54.369 46.8341 54.6714 47.1504 54.626 47.5271C54.3387 50.4495 53.5524 53.2213 52.3125 55.7521H52.3277ZM54.0212 43.8062H45.0394C44.4648 43.8062 44.1775 43.1132 44.5858 42.7215C46.4608 40.8536 50.241 37.0875 51.7833 35.566C52.1009 35.2497 52.6452 35.3551 52.8267 35.7619C53.8095 38.0516 54.4446 40.5071 54.6714 43.0982C54.7016 43.4748 54.4143 43.8062 54.0363 43.8062H54.0212Z"
      fill="#200260"
    />
  </chakra.svg>
)