package config

import "github.com/spf13/viper"

type Config struct {
	FirebaseAdminSDKCredentialsFile string	`mapstructure:"FIREBASE_ADMINSDK_CREDENTIALS_FILE"`
}

func LoadConfig(configFilePath string) (config Config, err error) {
	viper.SetConfigFile(configFilePath)
	
	err = viper.ReadInConfig()

	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)

	return
}