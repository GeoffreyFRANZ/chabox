const userRepository =  require('../repository/userRepository')

exports.listUsers = async () => {
    return await userRepository.findsUsers('n')
}