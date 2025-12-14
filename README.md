# Important: migration to main

!If you are reading this, you are probably reading an old garden last updated December 2025!

My garden moved from the 'master' to 'main' branch (belatedly) on this date.

Please update references:

> ```bash                                                                                                                                                      
> # Switch to your local master branch                                                                                                                         
> git checkout master                                                                                                                                          >                                                                                                                                                              
> # Rename it to main                                                                                                                                          
> git branch -m master main                                                                                                                                    
>                                                                                                                                                              
> # Fetch the latest changes from the remote                                                                                                                   
> git fetch                                                                                                                                                    
>                                                                                                                                                              
> # Point your new main branch to the remote main branch                                                                                                       
> git branch -u origin/main main                                                                                                                               
>                                                                                                                                                              
> # (Optional) Clean up old remote tracking branch                                                                                                             
> git remote prune origin                                                                                                                                      
> ```

See https://github.com/flancian/garden for more.
