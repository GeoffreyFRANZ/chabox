const userRepository =  require('../repository/userRepository')

exports.listUsers = async (val) => {
    return await userRepository.findsUsers(val)
}