package xyz.mendesoft.repo;

import org.springframework.data.jpa.repository.Query;
import xyz.mendesoft.model.User;

public interface IUserRepo extends IGenericRepo<User, Integer>  {

    //@Query("FROM User u WHERE u.username = ?")
    //Derived Query
    User findOneByUsername(String username);
}
