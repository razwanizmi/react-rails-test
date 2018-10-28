# 2. Write ruby code that model the following left child is always less than the
# parent & right child is always bigger than the parent. A parent can only have
# 2 immediate child node.
# 2.1 Write a method to add item to the model so caller can build the tree like
# below.
# 2.2 Then perform a walk of depth first search on the model so we get result
# like this: 21, 56, 62, 67, 78, 81, 97, 115

class Node
  attr_accessor :left, :right
  attr_reader :data

  def initialize(data, left = nil, right = nil)
    @data = data
    @left = left
    @right = right
  end
end

class BinarySearchTree
  attr_accessor :root

  def add(data)
    if !root
      self.root = Node.new(data)
    else
      dfs_add(root, data)
    end
  end

  def to_s
    result = []

    dfs_collect(root, result)

    result.join(", ")
  end

  private

  def dfs_add(node, data)
    if data < node.data
      if !node.left
        node.left = Node.new(data)
      else
        dfs_add(node.left, data)
      end
    end

    if data > node.data
      if !node.right
        node.right = Node.new(data)
      else
        dfs_add(node.right, data)
      end
    end
  end

  def dfs_collect(node, result)
    if node.left
      dfs_collect(node.left, result)
    end

    result << node.data

    if node.right
      dfs_collect(node.right, result)
    end
  end
end

=begin
tree = BinarySearchTree.new
tree.add(97)
tree.add(56)
tree.add(81)
tree.add(115)
tree.add(67)
tree.add(62)
tree.add(78)
tree.add(21)
tree.to_s
=end
