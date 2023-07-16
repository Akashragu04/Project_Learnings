/*
 *
 */
package com.daimler.schematicbackend.service.auth;

import com.daimler.schematicbackend.entity.user.UserData;
import com.daimler.schematicbackend.exception.auth.SchematicAuthException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * The Class SchematicUserDetailsService.
 */
@Service
public class SchematicUserDetailsService implements UserDetailsService {

    /**
     * The user service.
     */
    @Autowired
    SchematicUserService userService;

    /**
     * Load user by username.
     *
     * @param username the username
     * @return the user details
     * @throws UsernameNotFoundException the username not found exception
     */
    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserData> userDataOpt = userService.findByUserName(username);
        if (!userDataOpt.isPresent()) {
            throw new SchematicAuthException("Your Username is not registered");
        }
        UserData userData = userDataOpt.get();
        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new SimpleGrantedAuthority(userData.getAccessType()));
        return new User(userData.getUsername(), userData.getPassword(), roles);
    }

}
