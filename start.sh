# this is used by nekoweb's console to
# turn the uncompiled site into html

echo "\n"
echo " #     #    #    ####### #     # ";
echo " #  #  #   # #   #     # #  #  # ";
echo " #  #  #  #   #  #     # #  #  # ";
echo " #  #  # #     # #     # #  #  # ";
echo " #  #  # ####### #     # #  #  # ";
echo " #  #  # #     # #     # #  #  # ";
echo "  ## ##  #     # #######  ## ##  ";
echo "                                 ";

# use node to build our sites to html
npx @11ty/eleventy

echo "\n:3"
