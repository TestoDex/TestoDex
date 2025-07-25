# TestoDex Frontend

The frontend application for TestoDex - The most muscular DEX on the Sonic network! 💪

## 🏋️‍♂️ Features

- **Token Swapping**: Uniswap V2-style token exchanges
- **Staking Pools**: Earn rewards by staking tokens
- **Farming**: Provide liquidity and farm additional rewards
- **Admin Panel**: Complete pool and token management
- **Statistics Dashboard**: Real-time platform metrics
- **Documentation**: In-app guides and FAQs
- **Wallet Integration**: MetaMask and Web3 wallet support

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/testodex/testodex-frontend.git
   cd testodex-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open the app**
   - **Web**: Press `w` in the terminal or visit `http://localhost:8080`
   - **iOS**: Press `i` in the terminal (requires iOS Simulator)
   - **Android**: Press `a` in the terminal (requires Android Emulator)

## 📱 Development

### Project Structure

```
src/frontend/
├── components/          # Reusable UI components
│   ├── WalletConnect.js
│   ├── ContractAddressConfig.js
│   ├── PoolManager.js
│   ├── TokenMinter.js
│   └── StatsDashboard.js
├── screens/            # Main application screens
│   ├── AdminScreen.js
│   ├── SwapScreen.js
│   ├── StakingScreen.js
│   ├── FarmingScreen.js
│   └── DocsScreen.js
├── utils/              # Utility functions
│   └── web3.js         # Web3 integration
├── App.js              # Main application component
├── package.json        # Dependencies and scripts
├── app.json           # Expo configuration
├── babel.config.js    # Babel configuration
├── metro.config.js    # Metro bundler configuration
└── README.md          # This file
```

### Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run build` - Build for production
- `npm run build:web` - Build for web deployment
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

### Web3 Integration

The app uses `ethers.js` for Web3 functionality:

- **Wallet Connection**: MetaMask and other Web3 wallets
- **Contract Interaction**: Direct smart contract calls
- **Network Support**: Sonic network (Chain ID: 146)
- **Error Handling**: Comprehensive error management

### Theming

TestoDex features a unique bodybuilding/monster theme:

- **Color Scheme**: Purple (#7e3ff2) primary, with supporting colors
- **Typography**: Modern, readable fonts
- **Icons**: Emoji-based icons for fun and accessibility
- **Animations**: Smooth transitions and loading states

## 🏗️ Building for Production

### Web Deployment (Netlify)

1. **Build the web version**
   ```bash
   npm run build:web
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Set build command: `npm run build:web`
   - Set publish directory: `web-build`
   - Deploy!

### Mobile App Store Deployment

1. **Build for production**
   ```bash
   expo build:android  # For Android
   expo build:ios      # For iOS
   ```

2. **Follow platform-specific deployment guides**
   - [Android Play Store](https://docs.expo.dev/distribution/uploading-apps/)
   - [iOS App Store](https://docs.expo.dev/distribution/uploading-apps/)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Network Configuration
REACT_APP_NETWORK_CHAIN_ID=146
REACT_APP_NETWORK_RPC_URL=https://rpc.soniclabs.com
REACT_APP_NETWORK_EXPLORER=https://sonicscan.org

# Contract Addresses (update after deployment)
REACT_APP_TESTO_TOKEN_ADDRESS=0x...
REACT_APP_TSONIC_TOKEN_ADDRESS=0x...
REACT_APP_TREASURY_ADDRESS=0x...
REACT_APP_FACTORY_ADDRESS=0x...
REACT_APP_ROUTER_ADDRESS=0x...
REACT_APP_STAKING_ADDRESS=0x...
REACT_APP_FARMING_ADDRESS=0x...
```

### Contract Addresses

After deploying smart contracts, update the contract addresses in:
- `src/frontend/screens/AdminScreen.js` (default addresses)
- Environment variables
- Admin panel contract configuration

## 🧪 Testing

### Running Tests

```bash
npm test
```

### Test Structure

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Web3 and contract interaction tests
- **E2E Tests**: Full user flow testing

## 📚 Documentation

The app includes comprehensive in-app documentation:

- **Project Overview**: Introduction to TestoDex
- **Tokenomics**: TESTO and TSonic token details
- **Usage Guides**: How to swap, stake, and farm
- **Admin Guide**: Pool and token management
- **Smart Contracts**: Technical contract details
- **FAQ**: Common questions and answers
- **Theme Guide**: Bodybuilding theme explanation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow ESLint and Prettier configurations
- Use English comments
- Follow React Native best practices
- Maintain the bodybuilding theme

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Web3 connection problems**
   - Ensure MetaMask is installed
   - Check network configuration
   - Verify contract addresses

3. **Build errors**
   ```bash
   rm -rf node_modules
   npm install
   ```

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Review the [React Native documentation](https://reactnative.dev/)
- Open an issue on GitHub

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Sonic Network**: For providing the blockchain infrastructure
- **Expo Team**: For the amazing React Native framework
- **Ethers.js Team**: For Web3 integration tools
- **Community**: For feedback and contributions

---

**💪 Don't skip leg day—stake for gains!** 🏋️‍♂️ 